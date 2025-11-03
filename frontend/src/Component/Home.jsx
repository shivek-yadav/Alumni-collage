import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function Home({ user }) {
  const navigate = useNavigate();

  // Render Student Home Page
  const renderStudentHome = () => (
    <div className="bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome, {user.name}! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore opportunities, connect with alumni, and grow your career
          </p>
          <div className="flex justify-center space-x-4 flex-wrap">
            <Link to="/alumni" className="btn-primary text-lg">
              🤝 Find Alumni
            </Link>
            <Link to="/jobs" className="btn-secondary text-lg">
              💼 Browse Jobs
            </Link>
            <Link to="/events" className="btn-secondary text-lg">
              📅 View Events
            </Link>
            <Link to="/student-dashboard" className="btn-secondary text-lg">
              📊 My Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Learning Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Explore Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Discover job postings and internships from leading companies
              </p>
              <Link
                to="/jobs"
                className="text-blue-600 font-semibold hover:underline"
              >
                Browse Jobs →
              </Link>
            </div>

            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Connect with Alumni</h3>
              <p className="text-gray-600 mb-4">
                Build relationships with successful alumni and mentors
              </p>
              <Link
                to="/alumni"
                className="text-blue-600 font-semibold hover:underline"
              >
                View Alumni →
              </Link>
            </div>

            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Attend Events</h3>
              <p className="text-gray-600 mb-4">
                Participate in workshops, seminars, and networking events
              </p>
              <Link
                to="/events"
                className="text-blue-600 font-semibold hover:underline"
              >
                View Events →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Next Steps</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Complete your profile to get better recommendations and
            opportunities
          </p>
          <Link to="/edit-profile" className="btn-primary text-lg inline-block">
            ✏ Complete Your Profile
          </Link>
        </div>
      </section>
    </div>
  );

  // Render Alumni Home Page
  const renderAlumniHome = () => (
    <div className="bg-linear-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome Back, {user.name}! 🎓
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Share opportunities, mentor students, and strengthen your network
          </p>
          <div className="flex justify-center space-x-4 flex-wrap">
            <Link to="/alumni-dashboard" className="btn-primary text-lg">
              📊 My Dashboard
            </Link>
            <Link to="/alumni" className="btn-secondary text-lg">
              👥 View Alumni
            </Link>
            <Link to="/events" className="btn-secondary text-lg">
              📅 View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Alumni Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Make an Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2">Post Job Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Share job openings and internships with talented students
              </p>
              <button
                onClick={() => navigate("/alumni-dashboard")}
                className="text-green-600 font-semibold hover:underline"
              >
                Post a Job →
              </button>
            </div>

            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2">Mentor Students</h3>
              <p className="text-gray-600 mb-4">
                Guide the next generation and share your professional experience
              </p>
              <button
                onClick={() => navigate("/alumni-dashboard")}
                className="text-green-600 font-semibold hover:underline"
              >
                View Requests →
              </button>
            </div>

            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Organize Events</h3>
              <p className="text-gray-600 mb-4">
                Host workshops, seminars, and networking events for the
                community
              </p>
              <button
                onClick={() => navigate("/alumni-dashboard")}
                className="text-green-600 font-semibold hover:underline"
              >
                Create Event →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p>Alumni in Network</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <p>Active Job Postings</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p>Students Connected</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Render Admin/College Home Page
  const renderAdminHome = () => (
    <div className="bg-linear-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            College Admin Dashboard 🏫
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage the alumni portal and oversee community activities
          </p>
          <div className="flex justify-center space-x-4 flex-wrap">
            <Link to="/admin-dashboard" className="btn-primary text-lg">
              📊 Admin Dashboard
            </Link>
            <Link to="/alumni" className="btn-secondary text-lg">
              👥 View Users
            </Link>
            <Link to="/events" className="btn-secondary text-lg">
              📅 Manage Events
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Management Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">User Management</h3>
              <p className="text-gray-600 mb-4">
                Monitor and manage student and alumni accounts
              </p>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="text-purple-600 font-semibold hover:underline"
              >
                Manage Users →
              </button>
            </div>

            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Approve Content</h3>
              <p className="text-gray-600 mb-4">
                Review and approve job postings and events
              </p>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="text-purple-600 font-semibold hover:underline"
              >
                Review Content →
              </button>
            </div>

            <div className="card text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">View Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track portal activity and community engagement
              </p>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="text-purple-600 font-semibold hover:underline"
              >
                View Stats →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Stats */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <p>Total Alumni</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10000+</div>
              <p>Active Students</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p>Job Postings</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p>Events</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
//___________________________________________________________________________________________________________________________________________

  // Render Guest Home Page

  const renderGuestHome = () => (
    <div className="bg-linear-to-b from-blue-10 to-blue-300 shadow-3xl ">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 py-20 ">
        <div className="text-center ">
          <h1 className="text-6xl font-bold text-gray-900 mb-10">
            Welcome to Gulzar Group of Institutions Alumni Portal
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Connect with alumni, find opportunities, and grow your network
          </p>
          <div className="flex justify-center space-x-4">
            <Link
  to="/register"
  className="text-white text-lg px-6 py-3 rounded-full bg-blue-600 shadow-xl transition duration-300 ease-in-out"
  style={{ transition: "background-color 0.3s ease-in-out" }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "hsl(45.76,95.16%,51.37%)")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
>
  Get Started
</Link>

<Link
  to="/alumni"
  className="text-white text-lg px-6 py-3 rounded-full bg-blue-600 shadow-xl transition duration-300 ease-in-out"
  style={{ transition: "background-color 0.3s ease-in-out" }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "hsl(45.76,95.16%,51.37%)")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
>
  Explore Alumni
</Link>

          </div>
        </div>
      </section>

      {/* Features Section */}
<section className="bg-gradient-to-b from-white to-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16 tracking-tight">
      ✨ Our Features
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Feature 1 */}
      <div className="bg-white backdrop-blur-lg bg-opacity-80 border border-gray-200 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition duration-300 hover:-translate-y-1">
        <div className="text-5xl mb-4 animate-bounce">🤝</div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Networking</h3>
        <p className="text-gray-600 leading-relaxed">
          Connect with alumni and students from your college. Build meaningful relationships and expand your professional network.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white backdrop-blur-lg bg-opacity-80 border border-gray-200 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition duration-300 hover:-translate-y-1">
        <div className="text-5xl mb-4 animate-pulse">💼</div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Job Opportunities</h3>
        <p className="text-gray-600 leading-relaxed">
          Access exclusive job postings and internship opportunities shared by alumni and industry professionals.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white backdrop-blur-lg bg-opacity-80 border border-gray-200 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition duration-300 hover:-translate-y-1">
        <div className="text-5xl mb-4 animate-bounce">🎓</div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Mentorship</h3>
        <p className="text-gray-600 leading-relaxed">
          Get guidance from experienced alumni through our mentorship program. Learn from their experiences and insights.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section */}
<section className="bg-gradient-to-br from-yellow-50 via-white to-gray-100 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16 tracking-tight">
      📊 Alumni Portal Highlights
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
      {/* Stat Card */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
        <div className="text-5xl font-extrabold text-gray-900 mb-2">5000+</div>
        <p className="text-lg text-gray-700">Active Alumni</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
        <div className="text-5xl font-extrabold text-gray-900 mb-2">1000+</div>
        <p className="text-lg text-gray-700">Job Postings</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
        <div className="text-5xl font-extrabold text-gray-900 mb-2">500+</div>
        <p className="text-lg text-gray-700">Events</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
        <div className="text-5xl font-extrabold text-gray-900 mb-2">10000+</div>
        <p className="text-lg text-gray-700">Students</p>
      </div>
    </div>
  </div>
</section>



      {/* CTA Section */}
<section className="bg-gray-100 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Ready to Join?</h2>
    <p className="text-lg text-gray-600 mb-8">
      Start your journey with our alumni community today.
    </p>
    <Link
      to="/register"
      className="text-white text-lg px-8 py-3 rounded-full bg-blue-600 shadow-xl transition duration-300 ease-in-out hover:bg-[hsl(45.76,95.16%,51.37%)]"
    >
      Register Now
    </Link>
  </div>
</section>
    </div>
  );
  //________________________________________________________________________________________________________________________________________________________________________________________________________

  // Main render logic - show appropriate home page based on user role
  if (user) {
    if (user.role === "student") {
      return renderStudentHome();
    } else if (user.role === "alumni") {
      return renderAlumniHome();
    } else if (user.role === "admin") {
      return renderAdminHome();
    }
  }

  // Default guest home page
  return renderGuestHome();
}

export default Home;
