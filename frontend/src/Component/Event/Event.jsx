import React, { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    eventType: "",
    isVirtual: "",
  });
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [registering, setRegistering] = useState(null);

  useEffect(() => {
    fetchEvents();
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
        // Track which events user is registered for
        const userRegistered = events
          .filter((event) =>
            event.attendees?.some((att) => att.user === data.data._id)
          )
          .map((event) => event._id);
        setRegisteredEvents(userRegistered);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let url = `${import.meta.env.VITE_API_URL}/api/events`;

      if (filters.eventType) url += `&eventType=${filters.eventType}`;
      if (filters.isVirtual) url += `&isVirtual=${filters.isVirtual}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        // Filter events to show approved ones first, then pending
        const approvedEvents = data.data.filter((e) => e.isApproved);
        const pendingEvents = data.data.filter((e) => !e.isApproved);
        setEvents([...approvedEvents, ...pendingEvents]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDateBadge = (dateString) => {
    const d = new Date(dateString);
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const day = d.getDate();
    return { month, day };
  };

  const handleRegisterEvent = async (eventId) => {
    if (!user) {
      alert("Please login to register for events");
      return;
    }

    if (registeredEvents.includes(eventId)) {
      alert("You are already registered for this event");
      return;
    }

    setRegistering(eventId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Successfully registered for the event!");
        setRegisteredEvents([...registeredEvents, eventId]);
        // Refresh events to update attendee count
        fetchEvents();
      } else {
        alert(data.message || "Failed to register for event");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Error registering for event");
    } finally {
      setRegistering(null);
    }
  };

  const eventTypeStyle = (type) => {
    switch (type) {
      case "workshop":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "seminar":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "conference":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "networking":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "reunion":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3">
            Community Gatherings
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Upcoming Events & Webinars
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Join technical workshops, panel discussions, and alumni networking sessions.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 shadow-lg shadow-black/30">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Filter Sessions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Event Category
              </label>
              <select
                name="eventType"
                value={filters.eventType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="" className="bg-slate-900">All Categories</option>
                <option value="workshop" className="bg-slate-900">Workshop</option>
                <option value="seminar" className="bg-slate-900">Seminar</option>
                <option value="conference" className="bg-slate-900">Conference</option>
                <option value="reunion" className="bg-slate-900">Reunion</option>
                <option value="networking" className="bg-slate-900">Networking</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Format / Delivery
              </label>
              <select
                name="isVirtual"
                value={filters.isVirtual}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="" className="bg-slate-900">All Formats</option>
                <option value="true" className="bg-slate-900">Virtual (Online)</option>
                <option value="false" className="bg-slate-900">In-Person</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-400">Loading scheduled events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-1">No events scheduled</h3>
            <p className="text-xs text-slate-400">Try adjusting your filters to see more events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const dateInfo = getDateBadge(event.startDate);
              const isRegistered = registeredEvents.includes(event._id);

              return (
                <div
                  key={event._id}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between shadow-lg shadow-black/20"
                >
                  <div>
                    {/* Event Header Banner with Date Badge */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-xl bg-slate-800 border border-slate-700/80 flex flex-col items-center justify-center text-center shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                            {dateInfo.month}
                          </span>
                          <span className="text-base font-extrabold text-white leading-none">
                            {dateInfo.day}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border capitalize mb-1 ${eventTypeStyle(
                              event.eventType
                            )}`}
                          >
                            {event.eventType}
                          </span>
                          {event.isVirtual ? (
                            <span className="block text-[11px] font-medium text-emerald-400">
                              ● Virtual Webinar
                            </span>
                          ) : (
                            <span className="block text-[11px] font-medium text-slate-400">
                              ● In-Person Session
                            </span>
                          )}
                        </div>
                      </div>

                      {!event.isApproved && (
                        <span className="text-[10px] font-semibold px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 tracking-tight line-clamp-1">
                      {event.title}
                    </h3>

                    {/* Meta Details */}
                    <div className="space-y-2 text-xs text-slate-300 mb-4 bg-slate-950/40 p-3.5 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatDate(event.startDate)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                      {event.description}
                    </p>
                  </div>

                  {/* Attendees Counter & Action */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {event.attendees?.length || 0} Registered
                      </span>
                    </div>

                    {isRegistered ? (
                      <button
                        disabled
                        className="w-full py-2.5 px-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-xs rounded-xl cursor-default text-center flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Already Registered
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegisterEvent(event._id)}
                        disabled={registering === event._id}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/40 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition flex items-center justify-center gap-2"
                      >
                        {registering === event._id ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Confirming RSVP...</span>
                          </>
                        ) : (
                          "Register for Event"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
