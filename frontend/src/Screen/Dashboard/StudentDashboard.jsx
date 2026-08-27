import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentDashboard({ user }) {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequest, setProcessingRequest] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch connections
      const connResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/connections`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const connData = await connResponse.json();
      if (connData.success) {
        setConnections(connData.data.filter((c) => c.status === "accepted"));
        setPendingRequests(connData.data.filter((c) => c.status === "pending"));
      }

      // Fetch recent jobs
      const jobResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
      const jobData = await jobResponse.json();
      if (jobData.success) {
        setJobs(jobData.data.slice(0, 5));
      }

      // Fetch upcoming events
      const eventResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
      const eventData = await eventResponse.json();
      if (eventData.success) {
        setEvents(eventData.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    setProcessingRequest(requestId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/connections/${requestId}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Connection request accepted!");
        fetchDashboardData();
      } else {
        alert("Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Error accepting request");
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    setProcessingRequest(requestId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/connections/${requestId}/decline`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Connection request declined!");
        fetchDashboardData();
      } else {
        alert("Failed to decline request");
      }
    } catch (error) {
      console.error("Error declining request:", error);
      alert("Error declining request");
    } finally {
      setProcessingRequest(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-950 text-slate-300">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Loading student dashboard...</p>
      </div>
    );
  }

  const statMetrics = [
    {
      title: "My Connections",
      value: connections.length,
      color: "text-blue-400",
      badge: "Alumni network",
    },
    {
      title: "Pending Requests",
      value: pendingRequests.length,
      color: "text-amber-400",
      badge: "Awaiting review",
    },
    {
      title: "Open Roles",
      value: jobs.length,
      color: "text-purple-400",
      badge: "Active feeds",
    },
    {
      title: "Upcoming Sessions",
      value: events.length,
      color: "text-emerald-400",
      badge: "Community events",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3">
              Student Workspace
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{user.name}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your network connections, explore jobs posted by alumni, and RSVP for events.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statMetrics.map((stat, idx) => (
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
                <span className="text-[10px] font-semibold text-slate-500">
                  {stat.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout: Main Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Requests Alert Card */}
            {pendingRequests.length > 0 && (
              <div className="bg-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Pending Connection Requests ({pendingRequests.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {pendingRequests.map((req) => (
                    <div
                      key={req._id}
                      className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {req.requester.name}
                        </h4>
                        {req.message && (
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            "{req.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleAcceptRequest(req._id)}
                          disabled={processingRequest === req._id}
                          className="py-1.5 px-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition"
                        >
                          {processingRequest === req._id ? "Processing..." : "Accept"}
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(req._id)}
                          disabled={processingRequest === req._id}
                          className="py-1.5 px-3.5 bg-slate-800 hover:bg-slate-750 disabled:opacity-50 text-slate-300 font-semibold text-xs rounded-xl border border-slate-750 active:scale-95 transition"
                        >
                          {processingRequest === req._id ? "Processing..." : "Decline"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Jobs Feed */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Latest Opportunities</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fresh vacancies and internships shared by network alumni.
                  </p>
                </div>
                <Link
                  to="/jobs"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  View All Openings →
                </Link>
              </div>

              <div className="divide-y divide-slate-850">
                {jobs.map((job) => (
                  <div key={job._id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-sm text-white">{job.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {job.company} • {job.location}
                        </p>
                        <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                      <Link
                        to="/jobs"
                        className="py-1.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700/80 active:scale-95 transition shrink-0"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <p className="text-xs text-slate-500 py-6 text-center italic">
                    No active job postings right now. Check back soon!
                  </p>
                )}
              </div>
            </div>

            {/* Upcoming Events Feed */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Upcoming Community Sessions</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Workshops, webinars, and mock rounds scheduled by mentors.
                  </p>
                </div>
                <Link
                  to="/events"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  View All Events →
                </Link>
              </div>

              <div className="divide-y divide-slate-850">
                {events.map((event) => (
                  <div key={event._id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-sm text-white">{event.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          📍 {event.location} • {new Date(event.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        to="/events"
                        className="py-1.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700/80 active:scale-95 transition shrink-0"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <p className="text-xs text-slate-500 py-6 text-center italic">
                    No upcoming events found.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Student Profile Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm uppercase">
                  {user.name ? user.name.slice(0, 2) : "ST"}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{user.name}</h3>
                  <span className="text-[11px] text-blue-400 capitalize font-medium">
                    Student Member
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-slate-850">
                <div className="flex justify-between">
                  <span className="text-slate-500">Domain</span>
                  <span className="font-semibold text-white truncate max-w-[140px]">{user.branch || "General"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Graduation</span>
                  <span className="font-semibold text-white">Class of {user.graduationYear || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email</span>
                  <span className="font-semibold text-white truncate max-w-[140px]">{user.email}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/edit-profile")}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl border border-slate-750 active:scale-95 transition"
              >
                Edit Profile Details
              </button>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-4">
                Quick Shortcuts
              </h3>
              <div className="space-y-2.5 text-xs">
                <Link
                  to="/alumni"
                  className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition"
                >
                  Find Alumni Mentors
                </Link>
                <Link
                  to="/jobs"
                  className="block w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-center rounded-xl border border-slate-750 active:scale-95 transition"
                >
                  Browse Job Board
                </Link>
                <Link
                  to="/events"
                  className="block w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-center rounded-xl border border-slate-750 active:scale-95 transition"
                >
                  Explore Events
                </Link>
              </div>
            </div>

            {/* My Connections Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-4">
                Active Connections ({connections.length})
              </h3>
              <div className="space-y-3 text-xs">
                {connections.slice(0, 5).map((conn) => (
                  <div
                    key={conn._id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-850"
                  >
                    <span className="font-medium text-slate-300 truncate">
                      {conn.requester._id === user._id
                        ? conn.recipient.name
                        : conn.requester.name}
                    </span>
                    <span className="text-[10px] text-blue-400 font-semibold shrink-0">Connected</span>
                  </div>
                ))}
                {connections.length > 5 && (
                  <p className="text-[11px] text-slate-500 text-center pt-1">
                    +{connections.length - 5} more connections
                  </p>
                )}
                {connections.length === 0 && (
                  <p className="text-slate-500 italic text-center py-2">No connections yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
