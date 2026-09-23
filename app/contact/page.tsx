"use client";

import { motion } from "framer-motion";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      <Navbar />

      {/* Page Header */}
      <div className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Contact <span className="text-secondary">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 max-w-2xl mx-auto text-lg"
          >
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-20 -mt-24">

            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 text-[#385EEC] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#385EEC] group-hover:text-white transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Our Location</h3>
              <p className="text-slate-600 text-sm">Chinmaya Vidyalaya,<br />Chandanathope, Kollam</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-orange-50 text-[#FF6A00] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FF6A00] group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Phone Number</h3>
              <p className="text-slate-600 text-sm">0474 2712571<br /><span className="text-transparent selection:text-transparent">.</span></p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-[#0F284A]/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Email Address</h3>
              <p className="text-slate-600 text-sm">chin_kollam@chintvm.edu.in<br /><span className="text-transparent selection:text-transparent">.</span></p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-[#0F284A]/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Working Hours</h3>
              <p className="text-slate-600 text-sm">Monday - Saturday<br />8:30 AM - 4:00 PM</p>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

            {/* Form Section */}
            <div className="w-full lg:w-1/2 p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-[#FF9924]" />
                  Send us a Message
                </h2>
                <p className="text-slate-600">Fill out the form below and our team will get back to you shortly.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#385EEC]/50 focus:border-[#385EEC] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input type="email" id="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#385EEC]/50 focus:border-[#385EEC] transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#385EEC]/50 focus:border-[#385EEC] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Inquiry Type</label>
                    <select id="subject" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#385EEC]/50 focus:border-[#385EEC] transition-all appearance-none cursor-pointer">
                      <option value="">Select an option</option>
                      <option value="admissions">Admissions</option>
                      <option value="fees">Fee Payment</option>
                      <option value="general">General Inquiry</option>
                      <option value="careers">Careers</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">Your Message</label>
                  <textarea id="message" rows={5} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#385EEC]/50 focus:border-[#385EEC] transition-all resize-none"></textarea>
                </div>

                <button type="button" className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F284A] text-white font-bold rounded-xl hover:bg-[#385EEC] transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#385EEC]/30">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full bg-slate-200 relative">
              <iframe
                src="https://maps.google.com/maps?ll=8.934493,76.638692&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=1689960815386803714&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location Map"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
