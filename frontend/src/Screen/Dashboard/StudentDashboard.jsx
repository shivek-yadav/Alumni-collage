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
        "http://localhost:5000/api/connections",
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
      const jobResponse = await fetch(
        
        "http://localhost:5000/api/jobs"
      );
      const jobData = await jobResponse.json();
      if (jobData.success) {
        setJobs(jobData.data.slice(0, 5));
      }

      // Fetch upcoming events
      const eventResponse = await fetch("http://localhost:5000/api/events");
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
        `http://localhost:5000/api/connections/${requestId}/accept`,
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
        `http://localhost:5000/api/connections/${requestId}/decline`,
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
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}! 👋</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 shadow-md rounded-2xl bg-gray-300 ">
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600">
            {connections.length}
          </div>
          <p className="text-gray-600">Connections</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {pendingRequests.length}
          </div>
          <p className="text-gray-600">Pending Requests</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">
            {jobs.length}
          </div>
          <p className="text-gray-600">Job Opportunities  for student</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-orange-600">
            {events.length}
          </div>
          <p className="text-gray-600">Upcoming Events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Connection Requests</h2>
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div
                    key={req._id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <p className="font-semibold">{req.requester.name}</p>
                    {req.message && (
                      <p className="text-gray-600 text-sm">{req.message}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAcceptRequest(req._id)}
                        disabled={processingRequest === req._id}
                        className="btn-primary text-sm disabled:opacity-50"
                      >
                        {processingRequest === req._id
                          ? "Processing..."
                          : "Accept"}
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(req._id)}
                        disabled={processingRequest === req._id}
                        className="btn-secondary text-sm disabled:opacity-50"
                      >
                        {processingRequest === req._id
                          ? "Processing..."
                          : "Decline"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Jobs */}
          <div className="card rounded-2xl bg-gray-100 shadow-2xl p-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold p-2">Recent Job Postings</h2>
              <Link to="/jobs" className="text-blue-600 hover:underline pt-2">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-sm mt-2">
                    {job.description.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card border-l-4 border-blue-500 bg-gray-100 shadow-2xl p-2 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Link to="/events" className="text-blue-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event._id} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.location}</p>
                  <p className="text-sm mt-2">
                    {new Date(event.startDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 bg-gray-100 p-3 rounded-2xl shadow-2xl ">
          {/* Profile Card */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">My Profile</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Branch:</strong> {user.branch}
              </p>
              <p>
                <strong>Graduation:</strong> {user.graduationYear}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="w-full btn-primary mt-4"
            >
              ✏️ Edit Profile
            </button>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/alumni" className="block btn-primary text-center">
                Find Alumni
              </Link>
              <Link to="/jobs" className="block btn-secondary text-center">
                Browse Jobs
              </Link>
              <Link to="/events" className="block btn-secondary text-center">
                View Events
              </Link>
            </div>
          </div>

          {/* Connections */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">My Connections</h3>
            <div className="space-y-2">
              {connections.slice(0, 5).map((conn) => (
                <div key={conn._id} className="text-sm">
                  <p className="font-semibold">
                    {conn.requester._id === user._id
                      ? conn.recipient.name
                      : conn.requester.name}
                  </p>
                </div>
              ))}
            </div>
            {connections.length > 5 && (
              <p className="text-sm text-gray-600 mt-2">
                +{connections.length - 5} more
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
