import React from "react";
import { TenantPageShell } from "@/components/TenantPageShell";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import { getSchoolPageContent } from "@/lib/data/school-repository";

export default async function StudentCouncilPage() {
  const school = await requireActiveSchool();
  const page = await getSchoolPageContent(school.id, "student-council");
  const data = (page?.data ?? {}) as {
    quote?: string;
    paragraphs?: string[];
    roles?: string[];
    closingNote?: string;
  };

  return (
    <TenantPageShell school={school}>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={page?.heroImage || "/image/students council.jpeg"}
            alt="Student Council background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            {page?.title || "Student Council"}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-10">
        {data.paragraphs && data.paragraphs.length > 0 ? (
          <div className="bg-white rounded-md shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">
            {data.quote && (
              <blockquote className="border-l-4 border-blue-500 pl-6 mb-8">
                <p className="italic text-slate-700 font-medium text-xl md:text-2xl leading-relaxed">
                  {data.quote}
                </p>
              </blockquote>
            )}

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              {data.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {data.roles && data.roles.length > 0 && (
                <div className="bg-slate-50 rounded-md p-8 my-10 border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Our Vibrant Team Includes:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.roles.map((role) => (
                      <div key={role} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-slate-700 font-medium">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.closingNote && <p>{data.closingNote}</p>}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            Student Council details for {school.name} will be published soon.
          </div>
        )}
      </section>
    </TenantPageShell>
  );
}
