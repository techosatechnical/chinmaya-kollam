import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="inline-block mb-6">
              <img src="https://eteach-html.vercel.app/assets/img/logo/logo.png" alt="Logo" className="h-8 brightness-0 invert" />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              We provide high-quality online courses to help you stay ahead in the modern economy. Our platform is designed for continuous improvement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Our Courses</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Instructors</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Pricing Plan</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">24/7, Global Street, New York, USA</span>
              </li>
              <li className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">info@example.com <br/> support@example.com</span>
              </li>
              <li className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">+1 123 456 7890 <br/> +1 987 654 3210</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Subscribe to our newsletter to get latest updates and news.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/10 border border-white/10 text-white px-4 py-4 rounded focus:outline-none text-sm"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 bottom-0 bg-primary text-white px-6 rounded-r font-semibold hover:bg-secondary transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Eteach. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
