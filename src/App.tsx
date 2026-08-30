import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedEvent } from './components/FeaturedEvent';
import { EventsGrid } from './components/EventsGrid';
import { RegistrationSection } from './components/RegistrationSection';
import { Footer } from './components/Footer';
import { FEATURED_EVENT, SCHOOL_EVENTS } from './data/eventsData';

export default function App() {
  const [selectedEventId, setSelectedEventId] = useState<string>(FEATURED_EVENT.id);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegisterEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    scrollToSection('register');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#21261F] flex flex-col selection:bg-[#3B5BA5]/15 selection:text-[#21261F]">
      {/* 1. Navigation */}
      <Navbar onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onViewEvents={() => scrollToSection('events')} />

        {/* 3. Featured Event Banner */}
        <FeaturedEvent
          event={FEATURED_EVENT}
          onRegisterEvent={handleRegisterEvent}
        />

        {/* 4 & 5. Category Filters & Events Grid */}
        <EventsGrid
          events={SCHOOL_EVENTS}
          onRegisterEvent={handleRegisterEvent}
        />

        {/* 6. Registration CTA & Form Section */}
        <RegistrationSection
          events={SCHOOL_EVENTS}
          featuredEvent={FEATURED_EVENT}
          selectedEventId={selectedEventId}
          onSelectEventId={setSelectedEventId}
        />
      </main>

      {/* 7. Footer Section */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
