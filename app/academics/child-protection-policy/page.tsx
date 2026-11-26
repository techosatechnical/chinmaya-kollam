import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolDocuments } from "@/lib/data/school-repository";

export default async function ChildProtectionPolicyPage() {
  const school = await requireActiveSchool();
  const docs = await getSchoolDocuments(school.id, "child-protection-policy");
  const primaryDoc = docs[0];

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Child Protection Policy
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight drop-shadow-md">
            Safeguarding every child&apos;s wellbeing, dignity, and safety at {school.name}.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        {primaryDoc && primaryDoc.fileUrl !== "#" ? (
          <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-4 flex items-center justify-between border-b border-slate-800">
              <h2 className="text-lg font-semibold tracking-wide text-white">{primaryDoc.title}</h2>
              <a
                href={primaryDoc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-md transition-colors"
              >
                Download
              </a>
            </div>
            <div className="w-full h-[800px] bg-slate-100">
              <iframe src={primaryDoc.fileUrl} className="w-full h-full border-none" title={primaryDoc.title} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Child Protection Guidelines</h2>
            <p className="text-slate-600 leading-relaxed">
              {school.name} is committed to maintaining a safe, respectful, and protective environment for all students. Official policy documents can be uploaded and published by the school administrator.
            </p>
          </div>
        )}
      </section>
    </TenantPageShell>
  );
}
