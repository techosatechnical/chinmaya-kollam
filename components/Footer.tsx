import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import type { SchoolConfig } from "@/lib/types/school";

interface FooterProps {
  school: SchoolConfig;
}

export function Footer({ school }: FooterProps) {
  const { branding, contact, social, navVisibility, footer } = school;

  return (
    <footer className="bg-dark-surface pt-10 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-12 mb-8 lg:mb-10">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              {branding.logoWhiteFull ? (
                <img
                  src={branding.logoWhiteFull}
                  alt={`${school.name} Logo`}
                  className="h-20 w-auto"
                />
              ) : (
                <span className="text-xl font-bold text-white">{school.name}</span>
              )}
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              {navVisibility.about && (
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                    About
                  </Link>
                </li>
              )}
              {navVisibility.academics && (
                <li>
                  <Link href="/academics" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Academics
                  </Link>
                </li>
              )}
              {navVisibility.activities && (
                <li>
                  <Link href="/activities" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Activities
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-6">Explore</h3>
            <ul className="space-y-3">
              {navVisibility.facilities && (
                <li>
                  <Link href="/facilities" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Facilities
                  </Link>
                </li>
              )}
              {navVisibility.accolades && (
                <li>
                  <Link href="/accolades" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Accolades
                  </Link>
                </li>
              )}
              {navVisibility.innovationHub && (
                <li>
                  <Link href="/innovation-hub" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Innovation Hub
                  </Link>
                </li>
              )}
              {navVisibility.contact && (
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <span className="text-slate-400 text-sm">
                  {contact.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < contact.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              {contact.email && (
                <li className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {footer.copyrightName}. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/academics/school-safety-policy" className="hover:text-white transition-colors">
              Safety Policy
            </Link>
            <Link href="/academics/child-protection-policy" className="hover:text-white transition-colors">
              Child Protection
            </Link>
          </div>
        </div>
        {footer.poweredByText && (
          <div className="mt-8 text-center text-xs text-slate-600">
            Powered by{" "}
            <a href={footer.poweredByUrl || "#"} className="text-slate-400 hover:text-white transition-colors font-medium">
              {footer.poweredByText}
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
