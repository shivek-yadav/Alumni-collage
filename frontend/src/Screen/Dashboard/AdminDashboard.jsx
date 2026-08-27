import React, { useState, useEffect } from "react";

function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAlumni: 0,
    totalStudents: 0,
    totalJobs: 0,
    totalEvents: 0,
  });
  const [pendingEvents, setPendingEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch all users
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
      const userData = await userResponse.json();
      if (userData.success) {
        setUsers(userData.data);
        const alumni = userData.data.filter((u) => u.role === "alumni").length;
        const students = userData.data.filter(
          (u) => u.role === "student"
        ).length;

        setStats((prev) => ({
          ...prev,
          totalUsers: userData.data.length,
          totalAlumni: alumni,
          totalStudents: students,
        }));
      }

      // Fetch jobs
      const jobResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
      const jobData = await jobResponse.json();
      if (jobData.success) {
        setStats((prev) => ({
          ...prev,
          totalJobs: jobData.data.length,
        }));
      }

      // Fetch events
      const eventResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      const eventData = await eventResponse.json();
      if (eventData.success) {
        setStats((prev) => ({
          ...prev,
          totalEvents: eventData.data.length,
        }));
        setPendingEvents(eventData.data.filter((e) => !e.isApproved));
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/approve`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        setPendingEvents(pendingEvents.filter((e) => e._id !== eventId));
      }
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-950 text-slate-300">
        <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Loading system metrics...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Members",
      value: stats.totalUsers,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Active Alumni",
      value: stats.totalAlumni,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Students Enrolled",
      value: stats.totalStudents,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Job Listings",
      value: stats.totalJobs,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Community Events",
      value: stats.totalEvents,
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wide uppercase mb-3">
              Administrative Control
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Platform Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Oversee community registrations, moderate event submissions, and manage system health.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg shadow-black/20 flex flex-col justify-between"
            >
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                {stat.title}
              </span>
              <div className="mt-4 flex items-baseline justify-between">
                <span className={`text-3xl font-extrabold ${stat.color}`}>
                  {stat.value}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stat.bg} ${stat.color}`}>
                  Live
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation Toolbar */}
        <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-5 rounded-xl text-xs font-semibold transition ${activeTab === "overview"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            System Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-2 px-5 rounded-xl text-xs font-semibold transition ${activeTab === "users"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            Member Directory ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`py-2 px-5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${activeTab === "events"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
          >
            <span>Pending Approvals</span>
            {pendingEvents.length > 0 && (
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                {pendingEvents.length}
              </span>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Stream */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-1">
                Recent Network Activity
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Automated platform alerts and real-time logs.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950/50 border border-slate-850 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Member Growth</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {stats.totalUsers} accounts registered across all branches.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/50 border border-slate-850 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Career Opportunities</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {stats.totalJobs} active postings available on the network board.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/50 border border-slate-850 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Event Moderation</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {pendingEvents.length} submissions awaiting administrative verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Console */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">
                  Quick Actions
                </h2>
                <p className="text-xs text-slate-400 mb-6">
                  Shortcut management commands.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab("events")}
                    className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition shadow-md shadow-purple-600/20 text-left flex items-center justify-between"
                  >
                    <span>Review Pending Events</span>
                    <span className="font-bold">→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("users")}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs transition border border-slate-750 text-left flex items-center justify-between"
                  >
                    <span>Manage User Accounts</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: USERS TABLE */}
        {/* ========================================================================= */}
        {activeTab === "users" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Member Directory</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Registered profiles across student, alumni, and administrative roles.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">Member Name</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Branch</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-850/50 transition">
                      <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-300 uppercase">
                          {u.name?.charAt(0) || "U"}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${u.role === "admin"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : u.role === "alumni"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{u.branch || "—"}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${u.isVerified
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}
                        >
                          {u.isVerified ? "Verified" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PENDING EVENTS */}
        {/* ========================================================================= */}
        {activeTab === "events" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">
                Pending Event Approvals
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Submissions requiring administrative verification before becoming public.
              </p>
            </div>

            {pendingEvents.length === 0 ? (
              <div className="text-center py-16 bg-slate-950/40 border border-slate-850 rounded-2xl">
                <p className="text-sm font-medium text-slate-400">
                  🎉 No events are currently pending approval.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="p-5 bg-slate-950/50 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-base font-bold text-white">
                          {event.title}
                        </h3>
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">
                          Pending Review
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">
                        📍 {event.location} • Format: {event.isVirtual ? "Virtual" : "In-Person"}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-2xl line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        onClick={() => handleApproveEvent(event._id)}
                        className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 active:scale-95 transition"
                      >
                        Approve Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

