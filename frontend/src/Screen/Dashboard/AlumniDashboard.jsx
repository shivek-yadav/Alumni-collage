import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AlumniDashboard({ user }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    jobType: "Full-time",
    applicationDeadline: "",
  });
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    location: "",
    eventType: "workshop",
    startDate: "",
    endDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedJobForApplications, setSelectedJobForApplications] =
    useState(null);
  const [showApplications, setShowApplications] = useState(false);
  const [processingRequest, setProcessingRequest] = useState(null);
  const [processingApplication, setProcessingApplication] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch user's jobs
      const jobResponse = await fetch("http://localhost:5000/api/jobs");
      const jobData = await jobResponse.json();
      if (jobData.success) {
        setJobs(jobData.data.filter((j) => j.postedBy._id === user._id));
      }

      // Fetch user's events
      const eventResponse = await fetch("http://localhost:5000/api/events");
      const eventData = await eventResponse.json();
      if (eventData.success) {
        // Show user's events sorted by approval status
        const userEvents = eventData.data.filter(
          (e) => e.createdBy._id === user._id
        );
        const approvedEvents = userEvents.filter((e) => e.isApproved);
        const pendingEvents = userEvents.filter((e) => !e.isApproved);
        setEvents([...approvedEvents, ...pendingEvents]);
      }

      // Fetch connections
      const connResponse = await fetch(
        "http://localhost:5000/api/connections",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const connData = await connResponse.json();
      if (connData.success) {
        setConnections(connData.data);
        setMentorshipRequests(
          connData.data.filter(
            (c) => c.mentorshipRequest && c.status === "pending"
          )
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplications = (job) => {
    setSelectedJobForApplications(job);
    setShowApplications(true);
  };

  const handleCloseApplications = () => {
    setShowApplications(false);
    setSelectedJobForApplications(null);
  };

  const handleMentorshipResponse = async (requestId, action) => {
    setProcessingRequest(requestId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/connections/${requestId}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert(`Mentorship request ${action}ed successfully!`);
        fetchDashboardData();
      } else {
        alert(`Failed to ${action} mentorship request`);
      }
    } catch (error) {
      console.error(`Error ${action}ing mentorship request:`, error);
      alert(`Error ${action}ing mentorship request`);
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleApplicationResponse = async (applicationIndex, action) => {
    setProcessingApplication(applicationIndex);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/jobs/${selectedJobForApplications._id}/applications/${applicationIndex}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert(`Application ${action}ed successfully!`);
        fetchDashboardData();
        // Refresh the selected job to update applications
        const updatedJob = jobs.find(
          (j) => j._id === selectedJobForApplications._id
        );
        if (updatedJob) {
          setSelectedJobForApplications(updatedJob);
        }
      } else {
        alert(`Failed to ${action} application`);
      }
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      alert(`Error ${action}ing application`);
    } finally {
      setProcessingApplication(null);
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobFormData),
      });

      if (response.ok) {
        const data = await response.json();
        setJobs([...jobs, data.data]);
        setJobFormData({
          title: "",
          company: "",
          location: "",
          description: "",
          jobType: "Full-time",
          applicationDeadline: "",
        });
        setShowJobForm(false);
        alert("Job posted successfully!");
      } else {
        alert("Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      // Validate dates
      if (!eventFormData.startDate || !eventFormData.endDate) {
        alert("Please select both start and end dates");
        setSubmitting(false);
        return;
      }

      // Convert datetime-local to ISO format
      const startDate = new Date(eventFormData.startDate).toISOString();
      const endDate = new Date(eventFormData.endDate).toISOString();

      // Validate end date is after start date
      if (new Date(endDate) <= new Date(startDate)) {
        alert("End date must be after start date");
        setSubmitting(false);
        return;
      }

      const eventData = {
        ...eventFormData,
        startDate: startDate,
        endDate: endDate,
      };

      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents([...events, data.data]);
        setEventFormData({
          title: "",
          description: "",
          location: "",
          eventType: "workshop",
          startDate: "",
          endDate: "",
        });
        setShowEventForm(false);
        alert("Event created successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-950 text-slate-300">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Loading mentor dashboard...</p>
      </div>
    );
  }

  const statMetrics = [
    {
      title: "Jobs Posted",
      value: jobs.length,
      color: "text-blue-400",
      badge: "Active listings",
    },
    {
      title: "Events Hosted",
      value: events.length,
      color: "text-emerald-400",
      badge: "Organized",
    },
    {
      title: "Mentorship Requests",
      value: mentorshipRequests.length,
      color: "text-purple-400",
      badge: "Pending reply",
    },
    {
      title: "Network Connections",
      value: connections.length,
      color: "text-teal-400",
      badge: "Active network",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-3">
              Alumni & Mentor Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{user.name}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage your published career opportunities, organize workshops, and guide students.
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

        {/* Two Column Layout: Main Actions & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mentorship Requests Notification Panel */}
            {mentorshipRequests.length > 0 && (
              <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Pending Mentorship Requests ({mentorshipRequests.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {mentorshipRequests.map((req) => (
                    <div
                      key={req._id}
                      className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {req.requester.name}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          "{req.message}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleMentorshipResponse(req._id, "accept")}
                          disabled={processingRequest === req._id}
                          className="py-1.5 px-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition"
                        >
                          {processingRequest === req._id ? "Processing..." : "Accept"}
                        </button>
                        <button
                          onClick={() => handleMentorshipResponse(req._id, "decline")}
                          disabled={processingRequest === req._id}
                          className="py-1.5 px-3.5 bg-slate-800 hover:bg-slate-750 disabled:opacity-50 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 active:scale-95 transition"
                        >
                          {processingRequest === req._id ? "Processing..." : "Decline"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Job Postings */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">My Job Postings</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage active vacancies and inspect student applicants.
                  </p>
                </div>
                <button
                  onClick={() => setShowJobForm(!showJobForm)}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-600/25 active:scale-95 transition"
                >
                  {showJobForm ? "Close Form" : "+ Post New Opportunity"}
                </button>
              </div>

              {/* Collapsible Job Submission Form */}
              {showJobForm && (
                <form
                  onSubmit={handleJobSubmit}
                  className="mb-8 p-6 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-4"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    Create Career Posting
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Job Title (e.g., Associate Engineer)"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                      value={jobFormData.title}
                      onChange={(e) =>
                        setJobFormData({ ...jobFormData, title: e.target.value })
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                      value={jobFormData.company}
                      onChange={(e) =>
                        setJobFormData({ ...jobFormData, company: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Location (e.g., Remote / Noida)"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                      value={jobFormData.location}
                      onChange={(e) =>
                        setJobFormData({ ...jobFormData, location: e.target.value })
                      }
                      required
                    />
                    <select
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                      value={jobFormData.jobType}
                      onChange={(e) =>
                        setJobFormData({ ...jobFormData, jobType: e.target.value })
                      }
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Job Description & Responsibilities..."
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                    rows="4"
                    value={jobFormData.description}
                    onChange={(e) =>
                      setJobFormData({
                        ...jobFormData,
                        description: e.target.value,
                      })
                    }
                    required
                  />

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full sm:w-1/2 px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                      value={jobFormData.applicationDeadline}
                      onChange={(e) =>
                        setJobFormData({
                          ...jobFormData,
                          applicationDeadline: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="py-2.5 px-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition"
                      disabled={submitting}
                    >
                      {submitting ? "Publishing..." : "Publish Job Posting"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs rounded-xl transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Jobs List */}
              <div className="divide-y divide-slate-850">
                {jobs.map((job) => (
                  <div key={job._id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-sm text-white">{job.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {job.company} • {job.location} • <span className="text-blue-400 font-medium">{job.jobType}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-slate-800 border border-slate-750 text-slate-300 px-3 py-1 rounded-xl text-xs font-semibold">
                        {job.applications?.length || 0} Applicants
                      </span>
                      {job.applications && job.applications.length > 0 && (
                        <button
                          onClick={() => handleViewApplications(job)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-xl text-xs font-semibold active:scale-95 transition"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <p className="text-xs text-slate-500 py-6 text-center italic">
                    You haven't posted any jobs yet.
                  </p>
                )}
              </div>
            </div>

            {/* My Events */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">My Scheduled Events</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sessions, webinars, and technical workshops you are organizing.
                  </p>
                </div>
                <button
                  onClick={() => setShowEventForm(!showEventForm)}
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-emerald-600/25 active:scale-95 transition"
                >
                  {showEventForm ? "Close Form" : "+ Create Event"}
                </button>
              </div>

              {/* Collapsible Event Creation Form */}
              {showEventForm && (
                <form
                  onSubmit={handleEventSubmit}
                  className="mb-8 p-6 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-4"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    Organize Community Session
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Event Title"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                      value={eventFormData.title}
                      onChange={(e) =>
                        setEventFormData({
                          ...eventFormData,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                    <select
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                      value={eventFormData.eventType}
                      onChange={(e) =>
                        setEventFormData({
                          ...eventFormData,
                          eventType: e.target.value,
                        })
                      }
                    >
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="conference">Conference</option>
                      <option value="reunion">Reunion</option>
                      <option value="networking">Networking</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Location / Platform (e.g. Google Meet, Zoom, Hall 3)"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                    value={eventFormData.location}
                    onChange={(e) =>
                      setEventFormData({
                        ...eventFormData,
                        location: e.target.value,
                      })
                    }
                    required
                  />

                  <textarea
                    placeholder="Event Description & Key Takeaways..."
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                    rows="4"
                    value={eventFormData.description}
                    onChange={(e) =>
                      setEventFormData({
                        ...eventFormData,
                        description: e.target.value,
                      })
                    }
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        value={eventFormData.startDate}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            startDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        End Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-750 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                        value={eventFormData.endDate}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            endDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Event"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEventForm(false)}
                      className="py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs rounded-xl transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Events List */}
              <div className="divide-y divide-slate-850">
                {events.map((event) => (
                  <div key={event._id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-sm text-white">{event.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        📍 {event.location} • {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      {!event.isApproved ? (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-xl text-xs font-semibold">
                          Pending Approval
                        </span>
                      ) : (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-xl text-xs font-semibold">
                          ✓ Published
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <p className="text-xs text-slate-500 py-6 text-center italic">
                    No community events scheduled yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Profile Overview Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : "AL"}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{user.name}</h3>
                  <span className="text-[11px] text-emerald-400 capitalize font-medium">
                    Verified Mentor
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-slate-850">
                <div className="flex justify-between">
                  <span className="text-slate-500">Company</span>
                  <span className="font-semibold text-white truncate max-w-[140px]">{user.currentCompany || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Designation</span>
                  <span className="font-semibold text-white truncate max-w-[140px]">{user.designation || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Domain</span>
                  <span className="font-semibold text-white">{user.branch || "General"}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/edit-profile")}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700/80 active:scale-95 transition"
              >
                Edit Profile
              </button>
            </div>

            {/* Recent Connections Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-4">
                Recent Network Links
              </h3>
              <div className="space-y-3 text-xs">
                {connections.slice(0, 5).map((conn) => (
                  <div key={conn._id} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                    <span className="font-medium text-slate-300">
                      {conn.requester._id === user._id
                        ? conn.recipient.name
                        : conn.requester.name}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                  </div>
                ))}
                {connections.length === 0 && (
                  <p className="text-slate-500 italic text-center py-2">No connections yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Modal */}
      {showApplications && selectedJobForApplications && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Applications for {selectedJobForApplications.title}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedJobForApplications.applications?.length || 0} candidate submissions
                </p>
              </div>
              <button
                onClick={handleCloseApplications}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {selectedJobForApplications.applications &&
              selectedJobForApplications.applications.length > 0 ? (
                selectedJobForApplications.applications.map(
                  (application, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-sm text-white">
                            {application.user?.name || "Applicant"}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {application.user?.email || "No email"}
                          </p>
                        </div>
                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          Submitted
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 py-2 border-y border-slate-850">
                        <div>
                          <span className="text-slate-500 block">Branch / Domain</span>
                          <span className="font-medium text-white">{application.user?.branch || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Resume Link</span>
                          {application.resume ? (
                            <a
                              href={application.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 font-medium"
                            >
                              View PDF ↗
                            </a>
                          ) : (
                            <span className="text-slate-500">Not provided</span>
                          )}
                        </div>
                      </div>

                      {application.coverLetter && (
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                            Cover Note
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleApplicationResponse(idx, "accept")}
                          disabled={processingApplication === idx}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 active:scale-95 transition disabled:opacity-50"
                        >
                          {processingApplication === idx ? "Saving..." : "Accept"}
                        </button>
                        <button
                          onClick={() => handleApplicationResponse(idx, "reject")}
                          disabled={processingApplication === idx}
                          className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold active:scale-95 transition disabled:opacity-50"
                        >
                          {processingApplication === idx ? "Saving..." : "Reject"}
                        </button>
                        <button
                          onClick={() => navigate(`/profile/${application.user?._id}`)}
                          className="py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold border border-slate-750 transition"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-center text-slate-500 py-8 text-xs italic">
                  No applications received yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlumniDashboard;
