"use client";

import { useState } from "react";
import { taskArtifacts } from "@/data/mockData";
import { useWorkflow } from "./WorkflowContext";

type PackageFile = {
  name: string;
  bytes: Uint8Array;
};

const archiveName = "DEMO_Final_Response_Package_IDR-2025-018.zip";
const finalResponseName = "DEMO_Final_Response_IDR-2025-018.pdf";
const downloadableAssets: Record<string, string> = {
  "EV-WTB": "DEMO_WTB_Income_Itemisation_Northstar_Payments_v3.csv",
  "EV-GL": "DEMO_GL_Control_to_WTB_Reconciliation_US42_FY24.pdf",
  "EV-ADJ": "DEMO_Adjustments_and_Exclusions_Memo.pdf",
  "EV-SCOPE": "DEMO_Revenue_Sampling_Index_Internal_Only.csv",
  "EV-SIGN": "DEMO_IDR_Closeout_Signoff.pdf",
};

function textBytes(value: string) {
  return new TextEncoder().encode(value);
}

function concatBytes(parts: Uint8Array[]) {
  const size = parts.reduce((total, part) => total + part.length, 0);
  const output = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
}

function uint16(value: number) {
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, value, true);
  return bytes;
}

function uint32(value: number) {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value >>> 0, true);
  return bytes;
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createZip(files: PackageFile[]) {
  const localParts: Uint8Array[] = [];
  const directoryParts: Uint8Array[] = [];
  let offset = 0;

  for (const file of files) {
    const name = textBytes(file.name);
    const checksum = crc32(file.bytes);
    const localHeader = concatBytes([
      uint32(0x04034b50),
      uint16(20),
      uint16(0x0800),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(checksum),
      uint32(file.bytes.length),
      uint32(file.bytes.length),
      uint16(name.length),
      uint16(0),
      name,
    ]);
    const localEntry = concatBytes([localHeader, file.bytes]);
    localParts.push(localEntry);
    directoryParts.push(concatBytes([
      uint32(0x02014b50),
      uint16(20),
      uint16(20),
      uint16(0x0800),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(checksum),
      uint32(file.bytes.length),
      uint32(file.bytes.length),
      uint16(name.length),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(0),
      uint32(offset),
      name,
    ]));
    offset += localEntry.length;
  }

  const directory = concatBytes(directoryParts);
  const end = concatBytes([
    uint32(0x06054b50),
    uint16(0),
    uint16(0),
    uint16(files.length),
    uint16(files.length),
    uint32(directory.length),
    uint32(offset),
    uint16(0),
  ]);
  return concatBytes([...localParts, directory, end]);
}

function wrapResponseLine(text: string, width = 92) {
  if (!text.trim()) return [""];
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = `${line} ${word}`.trim();
    if (candidate.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function escapePdfText(text: string) {
  return text
    .replace(/[^\x20-\x7e]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function createResponsePdf(responseDraft: string) {
  const lines = [
    "DEMO DATA ONLY - NO REAL DATA",
    "",
    "Final Response Package - IDR-2025-018",
    "Generated after human review and final approval",
    "",
    ...responseDraft.split(/\r?\n/).flatMap((line) => wrapResponseLine(line)),
  ];
  const pages: string[][] = [];
  for (let index = 0; index < lines.length; index += 46) {
    pages.push(lines.slice(index, index + 46));
  }

  const objects: string[] = [];
  const pageObjectIds: number[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  for (const pageLines of pages) {
    const content = [
      "BT",
      "/F1 10 Tf",
      "48 750 Td",
      "14 TL",
      ...pageLines.flatMap((line, index) => index === 0 ? [`(${escapePdfText(line)}) Tj`] : ["T*", `(${escapePdfText(line)}) Tj`]),
      "ET",
    ].join("\n");
    const contentId = objects.length + 1;
    objects.push(`<< /Length ${textBytes(content).length} >>\nstream\n${content}\nendstream`);
    const pageId = objects.length + 1;
    pageObjectIds.push(pageId);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${contentId} 0 R /Resources << /Font << /F1 3 0 R >> >> >>`);
  }
  objects[1] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjectIds.length} >>`;

  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(textBytes(body).length);
    body += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }
  const xrefOffset = textBytes(body).length;
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  body += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return textBytes(body);
}

export function ResponsePackageDownload() {
  const { state } = useWorkflow();
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const selectedAssets = taskArtifacts.filter((artifact) => state.selectedEvidenceIds.includes(artifact.id) && downloadableAssets[artifact.id]);

  async function downloadPackage() {
    setStatus("working");
    try {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const files: PackageFile[] = [{ name: finalResponseName, bytes: createResponsePdf(state.responseDraft) }];
      for (const artifact of selectedAssets) {
        const fileName = downloadableAssets[artifact.id];
        const response = await fetch(`${basePath}/downloads/${encodeURIComponent(fileName)}`);
        if (!response.ok) throw new Error(`Missing package attachment: ${fileName}`);
        files.push({ name: `Supporting Documents/${fileName}`, bytes: new Uint8Array(await response.arrayBuffer()) });
      }
      const manifest = [
        "DEMO DATA ONLY - NO REAL DATA",
        "Final Response Package Manifest - IDR-2025-018",
        "Entity: Northstar Payments Services LLC (fictional demo entity)",
        "Status: Approved after human review",
        "",
        "Package contents:",
        ...files.map((file) => `- ${file.name}`),
      ].join("\n");
      files.push({ name: "PACKAGE_MANIFEST.txt", bytes: textBytes(manifest) });

      const zip = createZip(files);
      const url = URL.createObjectURL(new Blob([zip], { type: "application/zip" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = archiveName;
      link.click();
      URL.revokeObjectURL(url);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-5">
      <p className="text-sm font-semibold text-slate-900">Final Response ZIP</p>
      <p className="mt-2 text-sm text-slate-600">
        Download the approved response PDF with the selected supporting documents and datasets in one submission package.
      </p>
      <div className="mt-4 rounded-lg border border-blue-100 bg-white p-4 text-xs text-slate-600">
        <p className="font-semibold text-slate-700">Included in download</p>
        <p className="mt-2">{finalResponseName}</p>
        {selectedAssets.map((artifact) => <p className="mt-1" key={artifact.id}>{downloadableAssets[artifact.id]}</p>)}
        <p className="mt-1">PACKAGE_MANIFEST.txt</p>
      </div>
      <button className="workbench-primary mt-4" disabled={status === "working"} onClick={downloadPackage} type="button">
        {status === "working" ? "Preparing ZIP..." : "Download Final Response ZIP"}
      </button>
      {status === "error" ? <p className="mt-3 text-sm text-red-700">Unable to prepare the ZIP. Please try downloading again.</p> : null}
    </section>
  );
}
