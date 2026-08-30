import React, { useState } from 'react';
import { CalendarDays, Menu, X, ArrowRight, Bookmark } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection = 'home' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header id="nav-header" className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#DEDACE]">
      {/* Top Academic Sub-banner */}
      <div className="border-b border-[#DEDACE]/60 bg-[#F7F5EF] px-4 py-1 text-xs mono-font text-[#6B6F66] flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#7FA98C]"></span>
          <span>CAMPUS BULLETIN • TERM 1 (2026–2027)</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span>STUDENT ACTIVITIES BOARD</span>
          <span>•</span>
          <span className="text-[#3B5BA5] font-medium">DISCOVER & REGISTER</span>
        </div>
      </div>

      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand with S emblem */}
        <a 
          href="#home"
          id="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 bg-[#21261F] rounded-[4px] flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-[#3B5BA5] transition-colors">
            S
          </div>
          <span className="text-xl font-bold serif-font text-[#21261F] tracking-tight">
            School Events
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a
            id="nav-link-home"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className={`py-1 transition-colors cursor-pointer ${
              activeSection === 'home'
                ? 'text-[#21261F] border-b-2 border-[#3B5BA5] font-semibold'
                : 'text-[#6B6F66] hover:text-[#21261F]'
            }`}
          >
            Home
          </a>
          <a
            id="nav-link-events"
            href="#events"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('events');
            }}
            className={`py-1 transition-colors cursor-pointer ${
              activeSection === 'events'
                ? 'text-[#21261F] border-b-2 border-[#3B5BA5] font-semibold'
                : 'text-[#6B6F66] hover:text-[#21261F]'
            }`}
          >
            Events
          </a>
          <a
            id="nav-link-register"
            href="#register"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('register');
            }}
            className={`py-1 transition-colors cursor-pointer ${
              activeSection === 'register'
                ? 'text-[#21261F] border-b-2 border-[#3B5BA5] font-semibold'
                : 'text-[#6B6F66] hover:text-[#21261F]'
            }`}
          >
            Register
          </a>

          {/* Quick Action Button */}
          <button
            id="nav-cta-register"
            onClick={() => handleNavClick('register')}
            className="btn-blue text-xs py-2 px-4 shadow-xs"
          >
            <span>Sign Up</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="nav-mobile-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-[6px] border border-[#DEDACE] bg-white text-[#21261F] hover:bg-[#F7F5EF]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="nav-mobile-menu" className="md:hidden border-b border-[#DEDACE] bg-[#FFFFFF] px-4 py-4 space-y-3 shadow-md">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 text-base serif-font font-medium text-[#21261F] hover:bg-[#F7F5EF] rounded-[4px]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('events')}
              className="text-left px-3 py-2 text-base serif-font font-medium text-[#21261F] hover:bg-[#F7F5EF] rounded-[4px]"
            >
              Events Schedule
            </button>
            <button
              onClick={() => handleNavClick('register')}
              className="text-left px-3 py-2 text-base serif-font font-medium text-[#21261F] hover:bg-[#F7F5EF] rounded-[4px]"
            >
              Event Registration
            </button>
          </div>

          <div className="pt-2 border-t border-[#DEDACE]">
            <button
              onClick={() => handleNavClick('register')}
              className="w-full btn-blue text-sm justify-center"
            >
              <Bookmark className="w-4 h-4" />
              <span>Register for an Event</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
