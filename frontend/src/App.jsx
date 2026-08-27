import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Register from "./Component/Register";
import StudentDashboard from "./Screen/Dashboard/StudentDashboard";
import AlumniDashboard from "./Screen/Dashboard/AlumniDashboard";
import AdminDashboard from "./Screen/Dashboard/AdminDashboard";
import Alumni from "./Screen/Alumni";
import Jobs from "./Component/Job";
import Events from "./Component/Event/Event";
import Profile from "./Component/Profile";
import EditProfile from "./Component/EditProfile";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and fetch user data
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute user={user}>
                  <EditProfile user={user} setUser={setUser} />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute user={user} requiredRole="student">
                  <StudentDashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alumni-dashboard"
              element={
                <ProtectedRoute user={user} requiredRole="alumni">
                  <AlumniDashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute user={user} requiredRole="admin">
                  <AdminDashboard user={user} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
