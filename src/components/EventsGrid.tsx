import React, { useState, useMemo } from 'react';
import { SchoolEvent, EventCategory } from '../types';
import { EventCard } from './EventCard';
import { CategoryFilters } from './CategoryFilters';
import { Search } from 'lucide-react';

interface EventsGridProps {
  events: SchoolEvent[];
  onRegisterEvent: (eventId: string) => void;
}

export const EventsGrid: React.FC<EventsGridProps> = ({ events, onRegisterEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts for each category
  const counts = useMemo(() => {
    const res: Record<EventCategory | 'all', number> = {
      all: events.length,
      sports: 0,
      workshops: 0,
      competitions: 0,
      clubs: 0,
    };

    events.forEach((evt) => {
      if (res[evt.category] !== undefined) {
        res[evt.category]++;
      }
    });

    return res;
  }, [events]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchCategory = selectedCategory === 'all' || evt.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.organizer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <section id="events" className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#3B5BA5]"></span>
              <span className="mono-font text-xs uppercase tracking-widest text-[#3B5BA5] font-semibold">
                Event Directory
              </span>
            </div>
            <h2 id="events-grid-heading" className="serif-font text-2xl sm:text-4xl font-bold text-[#21261F] tracking-tight">
              Upcoming School Activities
            </h2>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#6B6F66] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="event-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, venue..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-[6px] bg-[#FFFFFF] border border-[#DEDACE] text-[#21261F] placeholder-[#6B6F66] focus:outline-none focus:border-[#3B5BA5] card-shadow"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#6B6F66] hover:text-[#21261F]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Section 4) */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={counts}
        />

        {/* 6 Event Cards Grid (Section 5) */}
        {filteredEvents.length > 0 ? (
          <div 
            id="events-cards-grid" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
          >
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={onRegisterEvent}
              />
            ))}
          </div>
        ) : (
          <div 
            id="no-events-found"
            className="school-card p-10 text-center my-6 space-y-3"
          >
            <p className="serif-font text-lg font-bold text-[#21261F]">
              No events found matching your filter
            </p>
            <p className="text-sm text-[#6B6F66]">
              Try clearing your search query or selecting "All Activities"
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-blue text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
