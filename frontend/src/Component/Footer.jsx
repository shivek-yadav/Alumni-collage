import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-slate-800 to-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              Connecting students, alumni, and the college community through mentorship,
              networking, and opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link to="/alumni" className="hover:text-yellow-400 transition">Alumni</Link></li>
              <li><Link to="/jobs" className="hover:text-yellow-400 transition">Jobs</Link></li>
              <li><Link to="/events" className="hover:text-yellow-400 transition">Events</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li><span className="font-medium text-white">Email:</span> ggi.ac.in</li>
              <li><span className="font-medium text-white">Helpline:</span> 9914666777</li>
              <li><span className="font-medium text-white">Address:</span> Grand Trunk Road Libra, Khanna, Punjab 141412</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4 text-gray-300">
              <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition"><FaFacebookF /> Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition"><FaTwitter /> Twitter</a>
              <a href="https://www.linkedin.com/company/ggi-gulzar-group-of-institutes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition"><FaLinkedinIn /> LinkedIn</a>
              <a href="https://www.instagram.com/ggi_ludhiana/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition"><FaInstagram /> Instagram</a>
              <a href="https://www.youtube.com/channel/UCsp8sAbvDifNF_9PlMqqfrQ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition"><FaYoutube /> YouTube</a>
              <a href="https://api.whatsapp.com/send/?phone=919914666777&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition"><FaWhatsapp /> WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Gulzar Group of Institutes Alumni Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
