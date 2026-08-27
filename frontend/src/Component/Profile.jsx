import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current logged-in user
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCurrentUser(data.data);
          }
        })
        .catch((err) => console.error("Error fetching current user:", err));
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
      const data = await response.json();

      if (data.success) {
        setUser(data.data);
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("Error loading profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-950 text-slate-300">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Loading profile data...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-950 px-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md text-center">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{error || "Profile Unavailable"}</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const roleStyles = {
    alumni: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    student: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header Banner */}
          <div className="h-44 bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border-b border-slate-800 relative" />

          {/* Profile Body */}
          <div className="px-6 sm:px-10 pb-10">
            {/* Top Bar: Avatar, Info, and Primary Badges */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-20 mb-8 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 border-4 border-slate-900 shadow-2xl flex items-center justify-center text-3xl font-extrabold text-white uppercase tracking-wider">
                  {user.name ? user.name.slice(0, 2) : "U"}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {user.name}
                    </h1>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold border ${roleStyles[user.role] || roleStyles.student
                        }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-300">
                    {user.designation ? `${user.designation} • ` : ""}
                    {user.branch || "General Member"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Class of {user.graduationYear || "N/A"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 flex-wrap">
                {currentUser && currentUser._id === user._id ? (
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 active:scale-95 transition inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 active:scale-95 transition">
                      Send Connection
                    </button>
                    {user.role === "alumni" && (
                      <button className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold active:scale-95 transition">
                        Request Mentorship
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-slate-800/80">
              {/* Left Column: Bio, Experience, Skills */}
              <div className="md:col-span-2 space-y-8">
                {/* About Bio */}
                <div>
                  <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
                    About
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 border border-slate-800/60 p-5 rounded-2xl">
                    {user.bio || "No professional biography provided yet."}
                  </p>
                </div>

                {/* Professional Information */}
                {(user.currentCompany || user.designation) && (
                  <div>
                    <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
                      Professional Experience
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {user.currentCompany && (
                        <div className="bg-slate-950/40 border border-slate-800/60 p-4 rounded-2xl">
                          <p className="text-xs font-semibold text-slate-400">Current Organization</p>
                          <p className="text-base font-bold text-white mt-1">{user.currentCompany}</p>
                        </div>
                      )}
                      {user.designation && (
                        <div className="bg-slate-950/40 border border-slate-800/60 p-4 rounded-2xl">
                          <p className="text-xs font-semibold text-slate-400">Role / Designation</p>
                          <p className="text-base font-bold text-white mt-1">{user.designation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {user.skills && user.skills.length > 0 && (
                  <div>
                    <h2 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
                      Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Contact & Profiles */}
              <div className="space-y-6">
                <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-4">
                    Contact & Links
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="truncate">{user.email}</span>
                    </div>

                    {user.linkedin && (
                      <div className="flex items-center gap-3 text-slate-300">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </div>
                        <a
                          href={user.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline truncate"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}

                    {user.github && (
                      <div className="flex items-center gap-3 text-slate-300">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </div>
                        <a
                          href={user.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline truncate"
                        >
                          GitHub Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
