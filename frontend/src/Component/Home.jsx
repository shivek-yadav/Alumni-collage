import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home({ user }) {
  const navigate = useNavigate();

  // =========================================================================
  // 🎓 STUDENT HOME VIEW
  // =========================================================================
  const renderStudentHome = () => (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
            Student Portal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{user.name}</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover verified career opportunities, connect directly with experienced alumni, and build your professional path.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/alumni"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 active:scale-95 transition"
            >
              Find Alumni Mentors
            </Link>
            <Link
              to="/jobs"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm active:scale-95 transition"
            >
              Browse Opportunities
            </Link>
            <Link
              to="/events"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm active:scale-95 transition"
            >
              Upcoming Events
            </Link>
            <Link
              to="/student-dashboard"
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm active:scale-95 transition"
            >
              My Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Learning & Career Path Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Accelerate Your Career
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Tailored tools designed to help you launch into the industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Explore Opportunities</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Discover job openings, internships, and entry-level positions shared directly by verified alumni.
              </p>
            </div>
            <Link to="/jobs" className="text-sm font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              Browse Jobs <span>→</span>
            </Link>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Connect with Alumni</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Filter alumni by industry, company, and specialization to seek mentorship and referrals.
              </p>
            </div>
            <Link to="/alumni" className="text-sm font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              View Directory <span>→</span>
            </Link>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Workshops & Webinars</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Participate in tech talks, mock interview sessions, and networking events led by professionals.
              </p>
            </div>
            <Link to="/events" className="text-sm font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
              View Events <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Profile Call-to-Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/20 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Keep Your Profile Up-to-Date
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Complete your skills, portfolio links, and career goals to get personalized alumni matches.
          </p>
          <Link
            to="/edit-profile"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 inline-block transition"
          >
            Update Profile Details
          </Link>
        </div>
      </section>
    </div>
  );

  // =========================================================================
  // 💼 ALUMNI HOME VIEW
  // =========================================================================
  const renderAlumniHome = () => (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-6">
            Alumni & Mentor Portal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{user.name}</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Give back to your community, mentor promising students, publish job openings, and expand your professional circle.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/alumni-dashboard"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition"
            >
              Open Dashboard
            </Link>
            <Link
              to="/alumni"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm active:scale-95 transition"
            >
              Network Directory
            </Link>
            <Link
              to="/events"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm active:scale-95 transition"
            >
              Community Events
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Make an Impact
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Contribute to the network by sharing knowledge and opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Post Job Openings</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Post full-time jobs, contracts, or internship roles from your organization directly to students.
              </p>
            </div>
            <button
              onClick={() => navigate("/alumni-dashboard")}
              className="text-left text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Create Job Posting <span>→</span>
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Student Mentorship</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Accept connection requests from students looking for career guidance and resume feedback.
              </p>
            </div>
            <button
              onClick={() => navigate("/alumni-dashboard")}
              className="text-left text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Review Requests <span>→</span>
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Host an Event</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Organize or speak at tech workshops, AMA sessions, or industry panel discussions.
              </p>
            </div>
            <button
              onClick={() => navigate("/alumni-dashboard")}
              className="text-left text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Schedule Event <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Network Stats Counter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <div className="text-4xl font-extrabold text-white mb-1">500+</div>
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Alumni in Network</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl font-extrabold text-white mb-1">200+</div>
              <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold">Active Opportunities</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl font-extrabold text-white mb-1">1,000+</div>
              <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Mentorship Connections</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // =========================================================================
  // 🛡️ ADMIN HOME VIEW
  // =========================================================================
  const renderAdminHome = () => (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wide uppercase mb-6">
            System Administration
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Control Center</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Oversee platform activity, manage member accounts, approve event and job postings, and audit system metrics.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/admin-dashboard"
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 active:scale-95 transition"
            >
              Open Admin Console
            </Link>
            <Link
              to="/alumni"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm active:scale-95 transition"
            >
              Manage Users
            </Link>
            <Link
              to="/events"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm active:scale-95 transition"
            >
              Manage Events
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">User Directory & Roles</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Audit student and alumni accounts, manage access roles, and handle verification requests.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="text-left text-sm font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
            >
              Manage Users <span>→</span>
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Content Moderation</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Review submitted job vacancies, verify company details, and moderate scheduled community events.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="text-left text-sm font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
            >
              Review Content <span>→</span>
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xl mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">System Analytics</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Monitor engagement rates, track active registrations, and evaluate portal performance metrics.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="text-left text-sm font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
            >
              View Reports <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Admin Quick Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">5,000+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400">Total Alumni</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">10,000+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400">Active Students</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">1,000+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400">Job Posts</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">500+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400">Events Hosted</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // =========================================================================
  // 🌐 GUEST / PUBLIC HOME VIEW (General Purpose)
  // =========================================================================
  const renderGuestHome = () => (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Global Alumni & Student Network
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Connect. Mentor. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300">
              Grow Your Career.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one professional ecosystem connecting graduates with current students for mentorship, career opportunities, and lifelong networking.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/25 active:scale-95 transition duration-150"
            >
              Get Started Free
            </Link>
            <Link
              to="/alumni"
              className="px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-base active:scale-95 transition duration-150"
            >
              Explore Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-2">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Built for meaningful professional growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xl mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Global Directory</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Find peers and mentors by organization, location, graduation year, or industry domain with instant search.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xl mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Exclusive Job Board</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Access internal job referrals, internships, and hiring opportunities published directly by alumni within top companies.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xl mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1-on-1 Mentorship</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect one-on-one with seasoned alumni for career roadmaps, mock interview practice, and resume guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Network Highlights / Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">5,000+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Active Alumni</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">1,000+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Opportunities</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">500+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Sessions & Events</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">10,000+</div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Students Mentored</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-tr from-blue-900/30 via-slate-900 to-indigo-900/30 border border-slate-800 rounded-3xl p-10 sm:p-14 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Join the Network?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Create your account in less than two minutes and start networking with professionals across the globe.
          </p>
          <Link
            to="/register"
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/25 active:scale-95 transition"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );

  // =========================================================================
  // Main Router Trigger
  // =========================================================================
  if (user) {
    if (user.role === "student") {
      return renderStudentHome();
    } else if (user.role === "alumni") {
      return renderAlumniHome();
    } else if (user.role === "admin") {
      return renderAdminHome();
    }
  }

  return renderGuestHome();
}

export default Home;
