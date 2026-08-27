import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: "",
    company: "",
    location: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: "",
    coverLetter: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchUserData();
  }, [filters]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        // Track which jobs user has already applied to
        const userAppliedJobs = jobs
          .filter((job) =>
            job.applications?.some((app) => app.user === data.data._id)
          )
          .map((job) => job._id);
        setAppliedJobs(userAppliedJobs);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let url = `${import.meta.env.VITE_API_URL}/api/jobs?isActive=true`;

      if (filters.jobType) url += `&jobType=${filters.jobType}`;
      if (filters.company) url += `&company=${filters.company}`;
      if (filters.location) url += `&location=${filters.location}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
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

  const handleApplyJob = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to apply for jobs");
      return;
    }

    if (user.role !== "student") {
      alert("Only students can apply for jobs");
      return;
    }

    if (!applicationData.resume.trim()) {
      alert("Please enter your resume URL");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${selectedJob._id}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(applicationData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        setAppliedJobs([...appliedJobs, selectedJob._id]);
        setApplicationData({ resume: "", coverLetter: "" });
        setShowApplicationForm(false);

        // Show success message and navigate to alumni profile
        setTimeout(() => {
          alert(
            `Great! You've applied for this job. Let's connect with ${selectedJob.postedBy.name}!`
          );
          navigate(`/profile/${selectedJob.postedBy._id}`);
        }, 500);
      } else {
        alert(data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Error submitting application");
    } finally {
      setSubmitting(false);
    }
  };

  const jobTypeBadge = (type) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Internship":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Part-time":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Contract":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Career Opportunities
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Discover roles, internships, and referrals posted directly by network alumni.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 shadow-lg shadow-black/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Job Type
              </label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="" className="bg-slate-900">All Job Types</option>
                <option value="Full-time" className="bg-slate-900">Full-time</option>
                <option value="Part-time" className="bg-slate-900">Part-time</option>
                <option value="Internship" className="bg-slate-900">Internship</option>
                <option value="Contract" className="bg-slate-900">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="Filter by company name"
                value={filters.company}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Remote, New York, Delhi"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Two Column Layout: Feed and Job Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Job Cards */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-3" />
                <p className="text-sm text-slate-400">Loading open positions...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 px-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-white mb-1">No postings match your search</h3>
                <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              jobs.map((job) => {
                const isSelected = selectedJob && selectedJob._id === job._id;
                const isApplied = appliedJobs.includes(job._id);

                return (
                  <div
                    key={job._id}
                    onClick={() => {
                      setSelectedJob(job);
                      setShowApplicationForm(false);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${isSelected
                        ? "bg-slate-900 border-blue-500/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-300">
                          {job.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isApplied && (
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Applied
                          </span>
                        )}
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full border ${jobTypeBadge(
                            job.jobType
                          )}`}
                        >
                          {job.jobType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      {job.salary?.isDisclosed && (
                        <span>
                          {job.salary.currency} {job.salary.min} - {job.salary.max}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Sticky Details Inspector */}
          <div className="lg:col-span-1">
            {selectedJob ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-20 shadow-2xl space-y-6">
                <div>
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${jobTypeBadge(
                      selectedJob.jobType
                    )}`}
                  >
                    {selectedJob.jobType}
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {selectedJob.title}
                  </h2>
                  <p className="text-sm text-blue-400 font-medium mt-1">
                    {selectedJob.company}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Location</span>
                    <span className="text-slate-200 font-semibold mt-0.5 block">{selectedJob.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Compensation</span>
                    <span className="text-slate-200 font-semibold mt-0.5 block">
                      {selectedJob.salary?.isDisclosed
                        ? `${selectedJob.salary.currency} ${selectedJob.salary.min} - ${selectedJob.salary.max}`
                        : "Competitive / Disclosed on request"}
                    </span>
                  </div>
                </div>

                {/* Job Description */}
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                    Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                      Key Requirements
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  {appliedJobs.includes(selectedJob._id) ? (
                    <div className="w-full py-2.5 px-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl text-center">
                      ✓ Already Applied for this Position
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowApplicationForm(!showApplicationForm)}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition"
                    >
                      {showApplicationForm ? "Close Application" : "Apply for Position"}
                    </button>
                  )}
                </div>

                {/* Application Form */}
                {showApplicationForm && !appliedJobs.includes(selectedJob._id) && (
                  <form
                    onSubmit={handleApplyJob}
                    className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-4 pt-4"
                  >
                    <h3 className="font-bold text-sm text-white">
                      Submit Your Application
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Resume URL *
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                        value={applicationData.resume}
                        onChange={(e) =>
                          setApplicationData({
                            ...applicationData,
                            resume: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Link to PDF resume (Google Drive, LinkedIn, Portfolio)
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Cover Note
                      </label>
                      <textarea
                        placeholder="Brief note highlighting why you are a great fit..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                        rows="3"
                        value={applicationData.coverLetter}
                        onChange={(e) =>
                          setApplicationData({
                            ...applicationData,
                            coverLetter: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/40 text-white font-semibold text-xs rounded-lg transition"
                      >
                        {submitting ? "Submitting..." : "Send Application"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowApplicationForm(false)}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <p className="text-sm font-medium">Select any posting to view full requirements and apply.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
