import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Alumni({ user }) {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    branch: "",
    company: "",
    skills: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [requestingConnection, setRequestingConnection] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    fetchCurrentUser();
    fetchAlumni();
  }, [filters]);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser(data.data);
        // Fetch sent connection requests
        const connResponse = await fetch(
          "http://localhost:5000/api/connections",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const connData = await connResponse.json();
        if (connData.success) {
          const sent = connData.data
            .filter((c) => c.requester._id === data.data._id)
            .map((c) => c.recipient._id);
          setSentRequests(sent);
        }
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/users?role=alumni";

      if (filters.branch) url += `&branch=${filters.branch}`;
      if (filters.company) url += `&company=${filters.company}`;
      if (filters.skills) url += `&skills=${filters.skills}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setAlumni(data.data);
      }
    } catch (error) {
      console.error("Error fetching alumni:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendConnectionRequest = async (alumniId) => {
    if (!currentUser) {
      alert("Please login to send connection requests");
      navigate("/login");
      return;
    }

    if (currentUser.role === "alumni") {
      alert("Alumni can only view other alumni profiles");
      return;
    }

    setRequestingConnection(alumniId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipient: alumniId,
          message: `Hi! I would like to connect with you.`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Connection request sent successfully!");
        setSentRequests([...sentRequests, alumniId]);
      } else {
        alert(data.message || "Failed to send connection request");
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Error sending connection request");
    } finally {
      setRequestingConnection(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3">
            Alumni Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Professional Network
          </h1>
          {currentUser && currentUser.role === "student" ? (
            <p className="text-sm sm:text-base text-slate-400">
              Connect directly with verified alumni across industries for career mentorship and referral opportunities.
            </p>
          ) : currentUser && currentUser.role === "alumni" ? (
            <p className="text-sm sm:text-base text-slate-400">
              Explore and connect with fellow alumni across various cohorts and technical domains.
            </p>
          ) : (
            <p className="text-sm sm:text-base text-slate-400">
              Discover accomplished members across global companies and specialized domains.
            </p>
          )}
        </div>

        {/* Filters Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 shadow-lg shadow-black/30">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Filter Alumni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Department / Branch
              </label>
              <input
                type="text"
                name="branch"
                placeholder="e.g. Computer Science"
                value={filters.branch}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Google, Microsoft, Startup"
                value={filters.company}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Skills & Tech Stack
              </label>
              <input
                type="text"
                name="skills"
                placeholder="e.g. React, Node.js, Python"
                value={filters.skills}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Alumni Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-400">Loading alumni directory...</p>
          </div>
        ) : alumni.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-1">No alumni found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search criteria or clear the filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map((person) => {
              const isSent = sentRequests.includes(person._id);
              const isPending = requestingConnection === person._id;

              return (
                <div
                  key={person._id}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between shadow-lg shadow-black/20"
                >
                  <Link to={`/profile/${person._id}`} className="block group">
                    {/* Top Identity Block */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-lg font-extrabold text-white uppercase shadow-md shadow-blue-500/20 shrink-0">
                        {person.name ? person.name.slice(0, 2) : "AL"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition truncate">
                          {person.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">
                          {person.branch || "General Member"}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Class of {person.graduationYear || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Professional Info Box */}
                    <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-950/40 p-3.5 rounded-xl border border-slate-850">
                      {person.currentCompany && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-medium">Company:</span>
                          <span className="text-slate-200 font-semibold truncate">{person.currentCompany}</span>
                        </div>
                      )}
                      {person.designation && (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-medium">Role:</span>
                          <span className="text-slate-200 truncate">{person.designation}</span>
                        </div>
                      )}
                      {!person.currentCompany && !person.designation && (
                        <p className="text-slate-500 italic">No workplace details provided</p>
                      )}
                    </div>

                    {/* Skills */}
                    {person.skills && person.skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {person.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2.5 py-0.5 rounded-md text-[11px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {person.skills.length > 3 && (
                            <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md text-[11px]">
                              +{person.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-slate-800 mt-2">
                    <Link to={`/profile/${person._id}`} className="flex-1">
                      <button className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition border border-slate-700/80 active:scale-95">
                        View Profile
                      </button>
                    </Link>

                    {currentUser && currentUser.role === "student" && (
                      <button
                        onClick={() => handleSendConnectionRequest(person._id)}
                        disabled={isPending || isSent}
                        className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5 ${
                          isSent
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-default"
                            : isPending
                            ? "bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700"
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
                        }`}
                      >
                        {isSent ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Connected</span>
                          </>
                        ) : isPending ? (
                          <>
                            <div className="w-3 h-3 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          "Connect"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Alumni;
