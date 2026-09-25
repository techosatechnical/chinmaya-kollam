import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "General Information | Chinmaya Vidyalaya",
  description: "General information and guidelines for Chinmaya Vidyalaya, Kollam.",
};

export default function GeneralInfoPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />
      {/* Header */}
      <section className="relative py-10 bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-20"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-slate-300 uppercase">Information</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            General Information
          </h1>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white p-2 rounded-md shadow-xl shadow-slate-200/50 border border-slate-200">
          {/* We use an iframe to embed the PDF directly in the page */}
          <iframe 
            src="/general%20info.pdf" 
            title="General Information PDF"
            className="w-full h-[75vh] min-h-[600px] rounded-md border border-slate-100"
            style={{ backgroundColor: '#e2e8f0' }}
          />
        </div>
        
        {/* Mobile Download Button (Visible mainly on small screens where inline PDF might be tough to read) */}
        <div className="mt-8 flex justify-center lg:hidden">
          <a 
            href="/general%20info.pdf" 
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors font-medium shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}



