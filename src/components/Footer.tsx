import React from 'react';
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigate }) => {
  return (
    <footer id="footer-section" className="bg-[#FFFFFF] border-t-4 border-t-[#21261F] text-[#21261F] mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#DEDACE]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[4px] bg-[#21261F] text-white flex items-center justify-center font-bold text-base shadow-xs">
                S
              </div>
              <span className="serif-font font-bold text-xl text-[#21261F]">
                School Events
              </span>
            </div>

            <p className="text-sm text-[#6B6F66] leading-relaxed max-w-sm">
              The official centralized activity portal for extracurricular sports, academic masterclasses, performing arts, and student council leagues.
            </p>

            <div className="space-y-2 text-xs mono-font text-[#6B6F66]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#3B5BA5]" />
                <span>Student Affairs Hall, Wing B, Room 102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C1442B]" />
                <span>activities@stmarks-academy.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#7FA98C]" />
                <span>(555) 234-8900 • Ext. 410</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="mono-font text-xs uppercase tracking-widest text-[#21261F] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#6B6F66] hover:text-[#3B5BA5] transition-colors cursor-pointer"
                >
                  Home Bulletin
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('featured-section')}
                  className="text-[#6B6F66] hover:text-[#3B5BA5] transition-colors cursor-pointer"
                >
                  Featured Highlight
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="text-[#6B6F66] hover:text-[#3B5BA5] transition-colors cursor-pointer"
                >
                  All Events Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('register')}
                  className="text-[#6B6F66] hover:text-[#3B5BA5] transition-colors cursor-pointer"
                >
                  Student Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines & Office Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="mono-font text-xs uppercase tracking-widest text-[#21261F] font-bold">
              Activity Desk Hours
            </h4>
            <div className="p-3.5 rounded-[6px] bg-[#F7F5EF] border border-[#DEDACE] text-xs mono-font space-y-1.5 text-[#6B6F66] card-shadow">
              <div className="flex justify-between">
                <span>Monday – Thursday:</span>
                <span className="font-semibold text-[#21261F]">08:00 AM – 05:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday:</span>
                <span className="font-semibold text-[#21261F]">08:00 AM – 03:30 PM</span>
              </div>
              <div className="flex justify-between text-[#C1442B]">
                <span>Weekends:</span>
                <span>Event Staff On Call</span>
              </div>
            </div>
            <p className="text-[11px] mono-font text-[#6B6F66]">
              Passes are digital. Present your QR code ticket upon entry at campus gates.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs mono-font text-[#6B6F66]">
          <div>
            © {new Date().getFullYear()} School Events. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Prototype Version 2.4</span>
            <span>•</span>
            <button
              onClick={onScrollToTop}
              className="inline-flex items-center gap-1 text-[#21261F] hover:text-[#3B5BA5] font-semibold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
