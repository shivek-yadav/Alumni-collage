import React from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaGithub,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-850 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Alumni<span className="text-blue-400">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A general-purpose professional ecosystem connecting graduates and students for mentorship, career referrals, and community engagement.
            </p>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-blue-400 transition-colors">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-blue-400 transition-colors">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-400 transition-colors">
                  Community Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer & Support Contact */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Developer & Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400 shrink-0" />
                <a
                  href="mailto:shivekyadav0786@gmail.com"
                  className="hover:text-blue-400 transition-colors truncate"
                >
                  shivekyadav0786@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaGlobe className="text-blue-400 shrink-0" />
                <a
                  href="https://shivekyadav.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  shivekyadav.in
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Developer Links */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/in/shivek-yadav"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-850 transition-all active:scale-95"
                title="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/shivek-yadav"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-all active:scale-95"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://shivekyadav.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-slate-850 transition-all active:scale-95"
                title="Portfolio Website"
              >
                <FaGlobe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-850 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} AlumniSphere. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built by{" "}
            <a
              href="https://shivekyadav.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-blue-400 font-medium transition-colors"
            >
              Shivek Yadav
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
