import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Newsletters | Chinmaya Vidyalaya",
  description: "Stay updated with the latest news, events, and achievements at Chinmaya Vidyalaya, Kollam.",
};

export default function NewsletterPage() {
  const newsletters = [
    {
      id: 1,
      title: "Annual Newsletter 2024-25",
      date: "Academic Year 2024-25",
      description: "Discover our latest achievements, events, and academic highlights for the year.",
      pdfLink: "/newsletter-_CV_KOLLAM2024-25.pdf",
      coverColor: "from-blue-600 to-indigo-700"
    },
    // Placeholders to show the grid
    {
      id: 2,
      title: "Term 1 Highlights",
      date: "September 2023",
      description: "A look back at the vibrant activities and successes of the first term.",
      pdfLink: "#",
      coverColor: "from-orange-500 to-red-600"
    },
    {
      id: 3,
      title: "Spring Edition",
      date: "March 2023",
      description: "Spring festival, sports day recaps, and special features from our students.",
      pdfLink: "#",
      coverColor: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="relative py-32 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        {/* Unsplash Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2000&auto=format&fit=crop"
            alt="Library background"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />

        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">


          <h1 className="py-6 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-linear-to-b from-white to-slate-400">
            Newsletters
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight">
            Catch up on the latest happenings, student achievements, and upcoming events at Chinmaya Vidyalaya.
          </p>
        </div>
      </section>

      {/* Newsletters Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="group bg-white rounded-md overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Card Header / Faux PDF Cover */}
              <div className={`h-40 bg-linear-to-br ${newsletter.coverColor} p-5 flex flex-col justify-between relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-size-[24px_24px] opacity-20 mix-blend-overlay"></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                    {newsletter.date}
                  </div>
                  <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                    {newsletter.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col grow">
                <p className="text-sm text-slate-600 mb-6 leading-relaxed grow">
                  {newsletter.description}
                </p>
                <a
                  href={newsletter.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm rounded-md hover:bg-blue-600 transition-colors font-semibold shadow-lg shadow-slate-200 group-hover:shadow-blue-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Read Newsletter
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}



