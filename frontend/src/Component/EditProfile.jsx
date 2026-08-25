import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    branch: "",
    graduationYear: "",
    currentCompany: "",
    designation: "",
    skills: "",
    linkedin: "",
    github: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        branch: user.branch || "",
        graduationYear: user.graduationYear || "",
        currentCompany: user.currentCompany || "",
        designation: user.designation || "",
        skills: user.skills ? user.skills.join(", ") : "",
        linkedin: user.linkedin || "",
        github: user.github || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to update profile");
        setSubmitting(false);
        return;
      }

      // Validate required fields
      if (!formData.name.trim()) {
        setError("Name is required");
        setSubmitting(false);
        return;
      }

      // Convert skills string to array
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const updateData = {
        name: formData.name,
        bio: formData.bio,
        branch: formData.branch,
        graduationYear: formData.graduationYear
          ? parseInt(formData.graduationYear)
          : null,
        currentCompany: formData.currentCompany,
        designation: formData.designation,
        skills: skillsArray,
        linkedin: formData.linkedin,
        github: formData.github,
      };

      const response = await fetch(
        "http://localhost:5000/api/auth/updatedetails",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.data);
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile: " + error.message);
    } finally {
      setSubmitting(false);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3">
            Account Settings
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Edit Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update your public profile, domain credentials, and career background.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-2xl text-sm mb-6 shadow-lg shadow-red-500/5">
            <svg
              className="w-5 h-5 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-4 rounded-2xl text-sm mb-6 shadow-lg shadow-emerald-500/5">
            <svg
              className="w-5 h-5 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Basic Information
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Your primary details visible to other network members.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Alex Morgan"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Field / Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="e.g., 2024"
                  min="1990"
                  max={new Date().getFullYear() + 10}
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Biography
                </label>
                <span className="text-[11px] text-slate-500">Max 500 chars</span>
              </div>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={500}
                placeholder="Share a short summary about your background, career focus, and goals..."
                rows="4"
                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
              />
            </div>
          </div>

          {/* Section 2: Professional Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Professional Information
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Your current workplace role and technical competencies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Current Company / Organization
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  placeholder="e.g., Tech Corp, StartUp Labs"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Designation / Role
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g., Full Stack Engineer"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Skills & Tech Stack
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, Python, System Architecture"
                rows="3"
                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                Separate individual skills with commas.
              </p>
            </div>
          </div>

          {/* Section 3: Social & Portfolio Profiles */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Social & Portfolio Profiles
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              External links for recruiters, peers, and potential mentees.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-150"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="py-3.5 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/40 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="py-3.5 px-6 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-sm rounded-xl border border-slate-700/80 active:scale-95 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
