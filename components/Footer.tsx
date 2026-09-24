import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#0B1121] pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="inline-block mb-6">
              <img src="/logos/CV Kollam WHITE.png" alt="Chinmaya Vidyalaya Kollam Logo" className="h-20 w-auto" />
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              Providing a strong foundation for students to discover their innate talents and skills, fostering holistic development and academic excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-400 transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link href="/academics" className="text-slate-400 hover:text-white transition-colors text-sm">Academics</Link></li>
              <li><Link href="/activities" className="text-slate-400 hover:text-white transition-colors text-sm">Activities</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/facilities" className="text-slate-400 hover:text-white transition-colors text-sm">Facilities</Link></li>
              <li><Link href="/accolades" className="text-slate-400 hover:text-white transition-colors text-sm">Accolades</Link></li>
              <li><Link href="/innovation-hub" className="text-slate-400 hover:text-white transition-colors text-sm">Innovation Hub</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-sm">Chinmaya Vidyalaya<br/>Kollam, Kerala</span>
              </li>
              <li className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-sm">info@chinmayakollam.edu.in</span>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-sm">+91 0000 000 000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 Chinmaya Vidyalaya Kollam. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
