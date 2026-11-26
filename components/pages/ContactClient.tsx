"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import type { SchoolConfig } from "@/lib/types/school";

interface ContactClientProps {
  contact: SchoolConfig["contact"];
}

export function ContactClient({ contact }: ContactClientProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, website }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Unable to send message. Please check your details.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <>
      <div className="bg-primary pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
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
            We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
          </motion.p>
        </div>
      </div>

      <section className="py-10 flex-1">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-20 -mt-12 md:-mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-md p-6 shadow-xl shadow-primary/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 text-accent-alt rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-alt group-hover:text-white transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Our Location</h3>
              <p className="text-slate-600 text-sm">
                {contact.addressLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < contact.addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-md p-6 shadow-xl shadow-primary/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-orange-50 text-accent rounded-full flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Phone Number</h3>
              <p className="text-slate-600 text-sm">{contact.phone || "Available soon"}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-md p-6 shadow-xl shadow-primary/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Email Address</h3>
              <p className="text-slate-600 text-sm">{contact.email || "Available soon"}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-md p-6 shadow-xl shadow-primary/5 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Working Hours</h3>
              <p className="text-slate-600 text-sm">
                {contact.workingHours.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < contact.workingHours.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-md shadow-sm border border-slate-100 overflow-hidden">
            <div className="w-full lg:w-1/2 p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-secondary" />
                  Send us a Message
                </h2>
                <p className="text-slate-600">
                  Fill out the form below and our team will get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-md border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-alt/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-md border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-alt/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-md border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-alt/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-slate-700">
                      Inquiry Type
                    </label>
                    <select
                      id="subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent-alt/50 focus:border-accent-alt transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select an option</option>
                      <option value="admissions">Admissions</option>
                      <option value="fees">Fee Payment</option>
                      <option value="general">General Inquiry</option>
                      <option value="careers">Careers</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-md border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-alt/50 transition-all resize-none"
                  />
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-emerald-50 text-emerald-800 text-sm border border-emerald-200">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Thank you! Your message has been submitted to the school office.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 text-red-800 text-sm border border-red-200">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-md hover:bg-accent-alt transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-alt/30 disabled:opacity-60 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div className="w-full lg:w-1/2 min-h-100 lg:min-h-full bg-slate-200 relative">
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location Map"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm p-6 text-center">
                  Campus map will be added soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
