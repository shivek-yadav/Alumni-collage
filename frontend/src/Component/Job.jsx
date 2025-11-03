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

      const response = await fetch("http://localhost:5000/api/auth/me", {
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
      let url = "http://localhost:5000/api/jobs?isActive=true";
      // let url = "http://localhost:5000/api/jobs";

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
        `http://localhost:5000/api/jobs/${selectedJob._id}/apply`,
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
          // Navigate to alumni profile page
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Job Opportunities</h1>

      {/* Filters */}
      <div className="bg-gray-400 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="input-field"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <input
            type="text"
            name="company"
            placeholder="Filter by company"
            value={filters.company}
            onChange={handleFilterChange}
            className="input-field"
          />
          <input
            type="text"
            name="location"
            placeholder="Filter by location"
            value={filters.location}
            onChange={handleFilterChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Jobs List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No jobs found matching your filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  className="card cursor-pointer hover:shadow-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
                      {job.jobType}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">📍 {job.location}</p>
                  <p className="text-gray-700 line-clamp-2">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="lg:col-span-1">
          {selectedJob ? (
            <div className="card sticky top-4">
              <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-600">Company</p>
                  <p className="text-lg">{selectedJob.company}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Location</p>
                  <p className="text-lg">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Job Type</p>
                  <p className="text-lg">{selectedJob.jobType}</p>
                </div>
                {selectedJob.salary?.isDisclosed && (
                  <div>
                    <p className="font-semibold text-gray-600">Salary</p>
                    <p className="text-lg">
                      {selectedJob.salary.currency} {selectedJob.salary.min} -{" "}
                      {selectedJob.salary.max}
                    </p>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-600">Description</p>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>
                {selectedJob.requirements && (
                  <div>
                    <p className="font-semibold text-gray-600">Requirements</p>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="text-gray-700">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-4 border-t">
                  {appliedJobs.includes(selectedJob._id) ? (
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold cursor-not-allowed">
                      ✓ Already Applied
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setShowApplicationForm(!showApplicationForm)
                      }
                      className="w-full btn-primary py-2"
                    >
                      {showApplicationForm ? "Cancel" : "Apply Now"}
                    </button>
                  )}
                </div>

                {/* Application Form */}
                {showApplicationForm &&
                  !appliedJobs.includes(selectedJob._id) && (
                    <form
                      onSubmit={handleApplyJob}
                      className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4 border-t pt-4"
                    >
                      <h3 className="font-bold text-lg">
                        Submit Your Application
                      </h3>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Resume URL *
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/resume.pdf"
                          className="input-field"
                          value={applicationData.resume}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              resume: e.target.value,
                            })
                          }
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Provide a link to your resume (PDF, Google Drive,
                          etc.)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          placeholder="Tell us why you're interested in this position..."
                          className="input-field"
                          rows="4"
                          value={applicationData.coverLetter}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              coverLetter: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="flex-1 btn-primary py-2 font-semibold"
                          disabled={submitting}
                        >
                          {submitting ? "Submitting..." : "Submit Application"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowApplicationForm(false)}
                          className="flex-1 btn-secondary py-2 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
              </div>
            </div>
          ) : (
            <div className="card text-center">
              <p className="text-gray-600">Select a job to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
