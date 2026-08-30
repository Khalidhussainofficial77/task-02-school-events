import React from 'react';
import { SchoolEvent } from '../types';
import { Calendar, Clock, MapPin, ArrowRight, Ban } from 'lucide-react';
import { EventIcon } from './EventIcon';

interface EventCardProps {
  event: SchoolEvent;
  onRegister: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const isOpen = event.status === 'open';

  return (
    <article
      id={`event-card-${event.id}`}
      className="school-card flex flex-col justify-between h-full p-5 relative group"
    >
      {/* Top Section */}
      <div>
        {/* Top Header Placeholder / Graphic Icon Box with Notebook Grid */}
        <div className="w-full h-24 rounded-[4px] bg-[#F7F5EF] border border-[#DEDACE] relative overflow-hidden mb-4 flex items-center justify-between p-3">
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-notebook-grid opacity-70 pointer-events-none" />

          {/* Left: Graphic category emblem */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div 
              className="w-10 h-10 rounded-[6px] bg-[#FFFFFF] border border-[#DEDACE] flex items-center justify-center text-[#21261F] card-shadow"
              style={{ borderColor: event.accentColor ? `${event.accentColor}40` : '#DEDACE' }}
            >
              <EventIcon name={event.iconName} className="w-5 h-5" />
            </div>
            <div>
              <span className="mono-font text-[10px] text-[#6B6F66] block uppercase tracking-wider">
                CATEGORY
              </span>
              <span className="mono-font text-xs font-semibold text-[#21261F]">
                {event.categoryEmoji} {event.categoryLabel}
              </span>
            </div>
          </div>

          {/* Right: Stamp Badge (Dashed border stamp) */}
          <div className="relative z-10">
            {isOpen ? (
              <div 
                id={`stamp-open-${event.id}`}
                className="stamp stamp-open rotate-[-2deg]"
              >
                <span>OPEN</span>
              </div>
            ) : (
              <div 
                id={`stamp-full-${event.id}`}
                className="stamp stamp-full rotate-[2deg]"
              >
                <span>FULL</span>
              </div>
            )}
          </div>
        </div>

        {/* Event Title (Lora serif) */}
        <h3 className="serif-font text-lg sm:text-xl font-bold text-[#21261F] leading-snug tracking-tight mb-2 group-hover:text-[#3B5BA5] transition-colors">
          {event.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#6B6F66] leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Details Grid */}
        <div className="space-y-2 py-3 border-t border-b border-[#DEDACE]/80 text-xs">
          <div className="flex items-center gap-2 text-[#21261F]">
            <Calendar className="w-3.5 h-3.5 text-[#3B5BA5] shrink-0" />
            <span className="font-medium">{event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-[#6B6F66]">
            <Clock className="w-3.5 h-3.5 text-[#C1442B] shrink-0" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-[#6B6F66]">
            <MapPin className="w-3.5 h-3.5 text-[#7FA98C] shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </div>

      {/* Card Footer & Action */}
      <div className="mt-4 pt-2 flex items-center justify-between gap-2">
        <div className="mono-font text-[11px] text-[#6B6F66]">
          {isOpen ? (
            <span className="text-[#3B5BA5] font-medium">
              ● {event.spotsLeft} spots remaining
            </span>
          ) : (
            <span className="text-[#C1442B] font-medium">
              ● Capacity reached
            </span>
          )}
        </div>

        {isOpen ? (
          <button
            id={`btn-register-${event.id}`}
            onClick={() => onRegister(event.id)}
            className="btn-blue text-xs py-1.5 px-3.5"
          >
            <span>Register</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <button
            id={`btn-closed-${event.id}`}
            disabled
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#F7F5EF] text-[#6B6F66] text-xs mono-font border border-[#DEDACE] cursor-not-allowed"
          >
            <Ban className="w-3 h-3 text-[#C1442B]" />
            <span>Full</span>
          </button>
        )}
      </div>
    </article>
  );
};
