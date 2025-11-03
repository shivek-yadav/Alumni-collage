import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    branch: "",
    graduationYear: new Date().getFullYear(),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "graduationYear" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0270b4] to-[#014f87] bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/images/ggi-campus.jpg')", // Replace with your actual image path
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-gray-200 backdrop-blur-md bg-opacity-95">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-[#0270b4]">
          Register
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c10d]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c10d]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c10d]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c10d]"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c10d]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-[#f9c10d]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f9c10d] text-[#002147] font-semibold p-3 rounded-lg hover:bg-yellow-400 transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

              <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f9c10d] font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
