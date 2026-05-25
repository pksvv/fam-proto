import Link from "next/link";
import { auditRequest, documentRequest } from "@/data/mockData";

export default function FoundationPage() {
  return (
    <main className="min-h-screen px-6 py-8 md:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          Audit management
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900">
          AI-enabled Tax Audit Management portal
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Static prototype foundation for a human-reviewed audit journey. Every
          record shown is synthetic and demonstrates explainable assistance,
          never automated filing or submission.
        </p>
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-brand p-6 text-white">
            <p className="text-xs uppercase tracking-wider text-blue-100">
              Audit request
            </p>
            <h2 className="mt-3 text-xl font-semibold">{auditRequest.title}</h2>
            <p className="mt-3 text-sm text-blue-100">{auditRequest.id}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              IDR in scope
            </p>
            <h2 className="mt-3 text-xl font-semibold">{documentRequest.title}</h2>
            <p className="mt-3 text-sm text-slate-500">{documentRequest.id}</p>
          </div>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white"
            href="/"
          >
            Portal shell coming in Milestone 2
          </Link>
          <span className="rounded-lg border border-slate-200 px-5 py-3 text-sm text-slate-600">
            Static export configured for GitHub Pages
          </span>
        </div>
      </div>
    </main>
  );
}

