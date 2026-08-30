import React from 'react';
import { ArrowDown, Calendar, Sparkles, Pin } from 'lucide-react';

interface HeroProps {
  onViewEvents: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewEvents }) => {
  return (
    <section id="home" className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 overflow-hidden">
      {/* Subtle Background Grid Accent */}
      <div className="absolute inset-0 bg-notebook-grid opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
        <div className="max-w-3xl">
          {/* Notebook Label / Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#FFFFFF] border border-[#DEDACE] card-shadow mb-6">
            <Pin className="w-3.5 h-3.5 text-[#C1442B]" />
            <span className="mono-font text-xs uppercase tracking-wider text-[#6B6F66] font-medium">
              Academic Year 2026–2027 • Official Calendar
            </span>
          </div>

          {/* Main Headline in Lora serif */}
          <h1 id="hero-headline" className="serif-font text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#21261F] leading-tight mb-4 tracking-tight">
            Discover upcoming school activities, tournaments & workshops.
          </h1>

          {/* Subtitle in Inter */}
          <p id="hero-subtext" className="text-base sm:text-lg text-[#6B6F66] leading-relaxed mb-8 max-w-2xl">
            From athletic house championships and STEM robotics expositions to creative writing labs and drama auditions — explore campus happenings and reserve your spot early.
          </p>

          {/* Main CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-cta-view-events"
              onClick={onViewEvents}
              className="btn-blue cursor-pointer"
            >
              <span>View Events</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            {/* Quick Metadata Snippet */}
            <div className="flex items-center gap-3 text-xs mono-font text-[#6B6F66] pl-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#3B5BA5]" />
                <span>6 Upcoming Activities</span>
              </span>
              <span>•</span>
              <span className="text-[#7FA98C] font-semibold flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7FA98C]"></span>
                <span>Open Registration</span>
              </span>
            </div>
          </div>
        </div>

        {/* Notebook Ruled Divider */}
        <div className="mt-12 pt-4 border-t border-[#DEDACE] flex items-center justify-between text-xs mono-font text-[#6B6F66]">
          <span className="tracking-widest uppercase text-[11px]">BULLETIN DESK NO. 2</span>
          <span className="hidden sm:inline">ST. MARK’S ACADEMIC ACTIVITIES BOARD</span>
        </div>
      </div>
    </section>
  );
};
