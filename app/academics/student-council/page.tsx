import React from 'react';
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function StudentCouncilPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-slate-900 selection:text-white">
      <TopBar />
      <Navbar />

      {/* Header */}
      <section className="relative py-28 bg-[#0B1121] text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/students council.jpeg"
            alt="Student Council background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="py-2 text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white drop-shadow-lg">
            Student Council
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-12">

          {/* Quote */}
          <blockquote className="border-l-4 border-blue-500 pl-6 mb-12">
            <p className="italic text-slate-700 font-medium text-xl md:text-2xl leading-relaxed">
              “Student council speaks a lot more about itself rather than just being a group of people, it showcases its unity, cooperation, coordination, and strengths to the world.”
            </p>
          </blockquote>

          {/* Main Body */}
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              Our School Council, which changes every year, has always been vibrant sets of students selected through a process of an election and later followed up by an interview. They share their interests, express their opinions and mark a change in the perspective of our school time for the other students. The feedback offered by the students and parents alike about the school council is the sense of ambition, and the awareness of the stronger feeling of membership in the school.
            </p>

            <p>
              All the members are equally welcome to try out for the school council. It creates a sense of self-learning and enables them to better manage their own learning. The school has always been proud of all the batches of school council leaders who have come forward as great leaders, who are positive about their competence in organisation and leadership skills.
            </p>

            <p>
              Even during the pandemic period, we have conducted online elections, interviews for selecting our new brilliant set of school council leaders, who have, like their predecessors, fulfilled their legacy and are setting the path for the new leaders.
            </p>

            {/* Team Roles Callout Box */}
            <div className="bg-slate-50 rounded-2xl p-8 my-10 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Vibrant Team Includes:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700 font-medium">Head Boy & Head Girl</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700 font-medium">Assistant Head Boy & Girl</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700 font-medium">Sports Secretary</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700 font-medium">Arts Secretary</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700 font-medium">House Captains</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700 font-medium">Executive Posts</span>
                </div>
              </div>
            </div>

            <p>
              We also are very elated to present a small other group of people in the council, who are the ambassadors of <strong>CVP (Chinmaya Vision Programme)</strong> as well as <strong>Swacch Vidyalaya</strong> leaders, who help in the running of the programs smoothly throughout.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
