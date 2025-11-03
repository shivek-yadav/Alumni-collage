import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case "student":
        return "/student-dashboard";
      case "alumni":
        return "/alumni-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-16 w-100" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>

            {user && (
              <>
                <Link to="/alumni" className="hover:text-blue-600 transition">Alumni</Link>
                <Link to="/jobs" className="hover:text-blue-600 transition">Jobs</Link>
                <Link to="/events" className="hover:text-blue-600 transition">Events</Link>
                <Link to={getDashboardLink()} className="hover:text-blue-600 transition">Dashboard</Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-white"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition text-white">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:text-blue-600 rounded">Home</Link>

            {user && (
              <>
                <Link to="/alumni" className="block px-4 py-2 hover:text-blue-600 rounded">Alumni</Link>
                <Link to="/jobs" className="block px-4 py-2 hover:text-blue-600 rounded">Jobs</Link>
                <Link to="/events" className="block px-4 py-2 hover:text-blue-600 rounded">Events</Link>
                <Link to={getDashboardLink()} className="block px-4 py-2 hover:text-blue-600 rounded">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:text-red-600 rounded"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="block px-4 py-2 hover:text-blue-600 rounded">Login</Link>
                <Link to="/register" className="block px-4 py-2 hover:text-green-600 rounded">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
