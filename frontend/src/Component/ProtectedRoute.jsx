import React from "react";
import { Navigate, Link } from "react-router-dom";

function ProtectedRoute({ user, requiredRole, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
        {/* Subtle background warning glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center">
          {/* Security Shield Icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center mb-5 shadow-lg shadow-red-500/10">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Access Restricted
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            You do not have the required permissions to view this section. This page is limited to{" "}
            <span className="text-red-400 font-semibold uppercase text-xs tracking-wider">
              {requiredRole}
            </span>{" "}
            accounts.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition active:scale-95"
            >
              Return Home
            </Link>
            <Link
              to="/alumni"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition active:scale-95"
            >
              Explore Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
