import fs from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("public/downloads");

await fs.mkdir(outputDir, { recursive: true });

async function writeCsvFiles() {
  const wtb = [
    "DEMO DATA ONLY - NO REAL DATA",
    "Schedule A - WTB Operating Income Itemisation",
    "Entity,Northstar Payments Services LLC (fictional demo entity)",
    "Period under review,January 1 2024 through January 31 2025",
    "Currency / units,USD / whole dollars",
    "Synthetic source extract,US42_FY24_CLOSE_v3",
    "",
    "GL Account,Operating Income Category,Amount (USD)",
    "402010,Merchant discount revenue,184726381",
    "402020,Network assessment reimbursement revenue,28194550",
    "402030,Gateway and processing fee revenue,17806922",
    "402040,Chargeback administration fees,3479610",
    "402090,Implementation and other service fees,1248940",
    "402950,Volume incentive rebates (contra-revenue),-9617228",
    ",Total operating income itemised,225839175",
    "",
    "Scope note,Includes synthetic operating income categories responsive to IDR-2025-018. Non-operating foreign exchange gain is addressed separately in Schedule C.",
  ].join("\n");

  const sampleIndex = [
    "DEMO DATA ONLY - INTERNAL WORKPAPER - NOT INCLUDED BY DEFAULT",
    "Sample ID,Income Stream,Synthetic Source Reference,Amount (USD),Purpose,Status",
    "S-001,Merchant discount revenue,INV-240218-SYN,825300,Illustrative transaction support,Available",
    "S-002,Gateway and processing fee revenue,INV-240731-SYN,148950,Illustrative transaction support,Available",
    "S-003,Implementation and other service fees,SOW-241015-SYN,92000,Illustrative service agreement,Available",
  ].join("\n");

  await fs.writeFile(path.join(outputDir, "DEMO_WTB_Income_Itemisation_Northstar_Payments_v3.csv"), wtb);
  await fs.writeFile(path.join(outputDir, "DEMO_Revenue_Sampling_Index_Internal_Only.csv"), sampleIndex);
}

function wrap(text, width) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (`${line} ${word}`.trim().length > width) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function escapePdfText(text) {
  return text.replace(/[^\x20-\x7e]/g, "-").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createPdfBytes(title, sections) {
  const lines = [];
  for (const section of sections) {
    lines.push({ text: section.heading, bold: true });
    for (const paragraph of section.paragraphs) {
      for (const line of wrap(paragraph, 98)) {
        lines.push({ text: line, bold: false });
      }
      lines.push({ text: "", bold: false });
    }
    lines.push({ text: "", bold: false });
  }
  const pages = [];
  for (let index = 0; index < lines.length; index += 39) {
    pages.push(lines.slice(index, index + 39));
  }

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  const pageIds = [];
  for (const pageLines of pages) {
    const stream = [
      "q 1 0.96 0.85 rg 42 748 528 24 re f Q",
      `BT /F2 10 Tf 0.46 0.27 0.02 rg 52 756 Td (${escapePdfText("DEMO DATA ONLY - NO REAL DATA")}) Tj ET`,
      `BT /F2 17 Tf 0.09 0.29 0.63 rg 42 715 Td (${escapePdfText(title)}) Tj ET`,
      ...pageLines.map((line, index) => `BT /${line.bold ? "F2" : "F1"} ${line.bold ? 11 : 9.5} Tf 0.18 0.23 0.3 rg 42 ${687 - (index * 14)} Td (${escapePdfText(line.text)}) Tj ET`),
      `BT /F1 8 Tf 0.43 0.48 0.55 rg 42 30 Td (${escapePdfText("Synthetic demonstration material - not for filing")}) Tj ET`,
    ].join("\n");
    const contentId = objects.length + 1;
    objects.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
    const pageId = objects.length + 1;
    pageIds.push(pageId);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${contentId} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> >>`);
  }
  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let document = "%PDF-1.4\n";
  const offsets = [0];
  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(document));
    document += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(document);
  document += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  document += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(document);
}

async function createPdf(filename, title, sections) {
  await fs.writeFile(path.join(outputDir, filename), createPdfBytes(title, sections));
}

await writeCsvFiles();
await createPdf("DEMO_GL_Control_to_WTB_Reconciliation_US42_FY24.pdf", "Schedule B - GL Control to WTB Reconciliation", [
  { heading: "Response Context", paragraphs: ["Entity: Northstar Payments Services LLC (fictional demo entity) | Period: January 1, 2024 through January 31, 2025 | Currency: USD", "Purpose: Reconcile operating income itemisation submitted in Schedule A to the synthetic general ledger control total."] },
  { heading: "Reconciliation Summary", paragraphs: ["WTB operating income itemisation total: $225,839,175", "GL operating income control total: $225,839,175", "Unexplained variance: $0 - Reconciled."] },
  { heading: "Reviewer Conclusion", paragraphs: ["The submitted synthetic operating income population agrees to the synthetic general ledger control total. Presentation and excluded-item decisions are documented separately in Schedule C."] },
]);
await createPdf("DEMO_Adjustments_and_Exclusions_Memo.pdf", "Schedule C - Adjustments and Exclusions Memorandum", [
  { heading: "Scope", paragraphs: ["This memorandum documents presentation and scope decisions evaluated in preparing the synthetic income itemisation response for IDR-2025-018."] },
  { heading: "AJ-01 - Volume Incentive Rebates", paragraphs: ["Amount: ($9,617,228). Conclusion: The amount represents contra-revenue associated with operating revenue streams and is included in Schedule A as a separate negative income line."] },
  { heading: "AJ-02 - Foreign Exchange Gain", paragraphs: ["Amount: $612,480. Conclusion: The synthetic foreign exchange gain is non-operating income and has been excluded from the operating income population responsive to this request."] },
  { heading: "Approval", paragraphs: ["Prepared by: Federal Tax Compliance | Reviewed by: AI.Tax.Copilot | Conclusion: Treatments agree to Schedule A and Schedule B."] },
]);
await createPdf("DEMO_IDR_Closeout_Signoff.pdf", "Internal IDR Closeout Sign-off", [
  { heading: "Completion Summary", paragraphs: ["All five synthetic IDR tasks were closed following human review. The response package includes Schedule A, Schedule B and Schedule C for the demonstration response."] },
  { heading: "Approval Record", paragraphs: ["Response population checked: $225,839,175 | Residual reconciliation variance: $0 | Reviewer: AI.Tax.Copilot | Status: Approved for response drafting."] },
]);
console.log(`Generated synthetic CSV and PDF support assets in ${outputDir}`);
