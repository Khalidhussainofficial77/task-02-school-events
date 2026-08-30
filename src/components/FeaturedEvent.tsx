import React from 'react';
import { SchoolEvent } from '../types';
import { Calendar, Clock, MapPin, Sparkles, BookmarkPlus, ArrowRight } from 'lucide-react';
import { EventIcon } from './EventIcon';

interface FeaturedEventProps {
  event: SchoolEvent;
  onRegisterEvent: (eventId: string) => void;
}

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({ event, onRegisterEvent }) => {
  return (
    <section id="featured-section" className="py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C1442B]"></span>
          <span className="mono-font text-xs uppercase tracking-widest text-[#C1442B] font-semibold">
            Featured Highlight
          </span>
        </div>

        {/* Large Featured Card */}
        <div 
          id="featured-event-banner" 
          className="school-card p-6 sm:p-8 lg:p-10 relative overflow-hidden"
        >
          {/* Subtle Watermark/Pattern in corner */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-notebook-dots opacity-30 pointer-events-none hidden md:block" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-4">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Pill */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[20px] bg-[#F7F5EF] border border-[#DEDACE] text-xs mono-font text-[#21261F] font-medium">
                  <span>{event.categoryEmoji}</span>
                  <span>{event.categoryLabel}</span>
                </span>

                {/* Dashed Stamp Badge */}
                <div 
                  id="featured-stamp-badge"
                  className="stamp stamp-open rotate-[-1deg]"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3B5BA5]"></span>
                  <span>STATUS: OPEN</span>
                </div>

                <span className="mono-font text-xs text-[#6B6F66]">
                  Code: <strong className="text-[#21261F] font-semibold">{event.badgeCode}</strong>
                </span>
              </div>

              {/* Title in Lora Serif */}
              <h2 id="featured-event-title" className="serif-font text-2xl sm:text-3xl lg:text-4xl font-bold text-[#21261F] tracking-tight leading-snug">
                {event.name}
              </h2>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-[#6B6F66] leading-relaxed max-w-3xl">
                {event.description}
              </p>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-2.5 rounded-[6px] bg-[#F7F5EF] border border-[#DEDACE]/70">
                  <Calendar className="w-4 h-4 text-[#3B5BA5] shrink-0 mt-0.5" />
                  <div>
                    <span className="block mono-font text-[10px] uppercase text-[#6B6F66]">Date</span>
                    <span className="text-xs font-semibold text-[#21261F]">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-[6px] bg-[#F7F5EF] border border-[#DEDACE]/70">
                  <Clock className="w-4 h-4 text-[#C1442B] shrink-0 mt-0.5" />
                  <div>
                    <span className="block mono-font text-[10px] uppercase text-[#6B6F66]">Time</span>
                    <span className="text-xs font-semibold text-[#21261F]">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-[6px] bg-[#F7F5EF] border border-[#DEDACE]/70">
                  <MapPin className="w-4 h-4 text-[#7FA98C] shrink-0 mt-0.5" />
                  <div>
                    <span className="block mono-font text-[10px] uppercase text-[#6B6F66]">Venue</span>
                    <span className="text-xs font-semibold text-[#21261F]">{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action / Organizer Card */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#DEDACE] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#DEDACE]">
                  <span className="mono-font text-xs uppercase text-[#6B6F66]">Target Audience</span>
                  <span className="text-xs font-semibold text-[#21261F] text-right">{event.targetAudience}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#DEDACE]">
                  <span className="mono-font text-xs uppercase text-[#6B6F66]">Organizer</span>
                  <span className="text-xs text-[#21261F] text-right font-medium">{event.organizer}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="mono-font text-xs uppercase text-[#6B6F66]">Availability</span>
                  <span className="mono-font text-xs font-bold text-[#3B5BA5]">{event.spotsLeft} Seats Available</span>
                </div>
              </div>

              {/* Registration CTA */}
              <div>
                <button
                  id="featured-event-cta"
                  onClick={() => onRegisterEvent(event.id)}
                  className="w-full btn-blue cursor-pointer"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Register For Featured Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[11px] text-[#6B6F66] text-center mt-2 mono-font">
                  Instant student confirmation stub generated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
