import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function ImageSlider() {
  const slides = [
    {
      badge: "Alumni Spotlight",
      quote:
        "Connecting with my alumni mentor gave me the direct referral and interview prep that helped me land my first software engineering role.",
      author: "Alex Morgan",
      title: "Full-Stack Engineer at CloudScale",
      tag: "Class of 2023",
      accent: "from-blue-600/20 to-indigo-600/10 border-blue-500/30",
    },
    {
      badge: "Mentorship Impact",
      quote:
        "Being able to give back by reviewing portfolios and hosting mock technical rounds is one of the most rewarding parts of this network.",
      author: "Priya Sharma",
      title: "Senior Product Designer",
      tag: "10+ Students Mentored",
      accent: "from-emerald-600/20 to-teal-600/10 border-emerald-500/30",
    },
    {
      badge: "Career Growth",
      quote:
        "Over 200+ companies actively post internal vacancies and referral opportunities directly to our verified student pool every month.",
      author: "Global Opportunities",
      title: "Verified Community Job Board",
      tag: "Active Hiring",
      accent: "from-purple-600/20 to-pink-600/10 border-purple-500/30",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`p-8 sm:p-12 bg-gradient-to-br ${slide.accent} bg-slate-900 flex flex-col justify-between min-h-[300px] text-left relative overflow-hidden`}
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  {slide.badge}
                </div>
                <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed max-w-2xl">
                  “{slide.quote}”
                </blockquote>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-800/80 gap-3">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {slide.author}
                  </h4>
                  <p className="text-xs text-slate-400">{slide.title}</p>
                </div>
                <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                  {slide.tag}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
