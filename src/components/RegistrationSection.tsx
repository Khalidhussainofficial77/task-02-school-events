import React, { useState, useEffect } from 'react';
import { SchoolEvent, RegistrationConfirmation } from '../types';
import { 
  CheckCircle2, 
  Send, 
  Ticket, 
  User, 
  Mail, 
  Printer, 
  RotateCcw,
  Check
} from 'lucide-react';

interface RegistrationSectionProps {
  events: SchoolEvent[];
  featuredEvent: SchoolEvent;
  selectedEventId: string;
  onSelectEventId: (id: string) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  events,
  featuredEvent,
  selectedEventId,
  onSelectEventId,
}) => {
  // Combine featured event and list of events for dropdown
  const allRegisterableEvents = [featuredEvent, ...events];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 10');
  const [activeEventId, setActiveEventId] = useState(selectedEventId || featuredEvent.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<RegistrationConfirmation | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; eventId?: string }>({});

  // Sync when prop selectedEventId changes from external card button click
  useEffect(() => {
    if (selectedEventId) {
      setActiveEventId(selectedEventId);
    }
  }, [selectedEventId]);

  const validate = () => {
    const errs: { fullName?: string; email?: string; eventId?: string } = {};
    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!activeEventId) {
      errs.eventId = 'Please select an event.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedObj = allRegisterableEvents.find((evt) => evt.id === activeEventId) || featuredEvent;
      const randomTicketNum = `SE-${Math.floor(100000 + Math.random() * 900000)}`;
      
      setConfirmation({
        ticketNumber: randomTicketNum,
        event: selectedObj,
        registrantName: fullName.trim(),
        email: email.trim(),
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setConfirmation(null);
    setFullName('');
    setEmail('');
    setStudentId('');
    setErrors({});
  };

  return (
    <section id="register" className="py-12 sm:py-16 bg-[#F7F5EF] relative border-t border-[#DEDACE]">
      {/* Background ruling */}
      <div className="absolute inset-0 bg-notebook-ruled opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#FFFFFF] border border-[#DEDACE] text-xs mono-font text-[#3B5BA5] font-semibold mb-3 card-shadow">
            <Ticket className="w-3.5 h-3.5" />
            <span>STUDENT & GUEST ADMISSION FORM</span>
          </div>

          <h2 id="register-heading" className="serif-font text-3xl sm:text-4xl font-bold text-[#21261F] tracking-tight mb-3">
            Register for an Upcoming Event
          </h2>

          <p className="text-sm sm:text-base text-[#6B6F66]">
            Select your activity, enter your participant credentials, and receive an instant digital entry pass for the turnstiles.
          </p>
        </div>

        {!confirmation ? (
          /* Registration Form Card */
          <div className="school-card p-6 sm:p-10 relative">
            {/* Form decorative notebook perforations left border */}
            <div className="hidden sm:block absolute left-3 top-6 bottom-6 w-0.5 border-l border-dashed border-[#DEDACE]" />

            <form onSubmit={handleSubmit} className="space-y-6 sm:pl-4">
              {/* Event Dropdown Selection */}
              <div>
                <label 
                  htmlFor="event-select-dropdown" 
                  className="block mono-font text-xs uppercase tracking-wider text-[#21261F] font-semibold mb-2"
                >
                  1. Select School Event <span className="text-[#C1442B]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="event-select-dropdown"
                    value={activeEventId}
                    onChange={(e) => {
                      setActiveEventId(e.target.value);
                      onSelectEventId(e.target.value);
                    }}
                    className={`w-full px-4 py-3 rounded-[6px] bg-[#F7F5EF] border text-sm text-[#21261F] focus:outline-none focus:bg-[#FFFFFF] transition-colors appearance-none cursor-pointer ${
                      errors.eventId ? 'border-[#C1442B]' : 'border-[#DEDACE] focus:border-[#3B5BA5]'
                    }`}
                  >
                    <optgroup label="Featured Activity">
                      <option value={featuredEvent.id}>
                        ⭐ {featuredEvent.name} — ({featuredEvent.date} @ {featuredEvent.venue})
                      </option>
                    </optgroup>

                    <optgroup label="Upcoming Campus Events">
                      {events.map((evt) => (
                        <option 
                          key={evt.id} 
                          value={evt.id}
                          disabled={evt.status === 'full'}
                        >
                          {evt.categoryEmoji} {evt.name} — {evt.date} {evt.status === 'full' ? '(FULL)' : `(${evt.spotsLeft} spots)`}
                        </option>
                      ))}
                    </optgroup>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6B6F66] mono-font text-xs">
                    ▼
                  </div>
                </div>
                {errors.eventId && (
                  <p className="mt-1 text-xs text-[#C1442B] mono-font">{errors.eventId}</p>
                )}
              </div>

              {/* Name and Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label 
                    htmlFor="input-full-name" 
                    className="block mono-font text-xs uppercase tracking-wider text-[#21261F] font-semibold mb-2"
                  >
                    2. Full Name <span className="text-[#C1442B]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#6B6F66] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maya Lin or Alex Morgan"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-[6px] bg-[#F7F5EF] border text-sm text-[#21261F] placeholder-[#6B6F66]/70 focus:outline-none focus:bg-[#FFFFFF] transition-colors ${
                        errors.fullName ? 'border-[#C1442B]' : 'border-[#DEDACE] focus:border-[#3B5BA5]'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-[#C1442B] mono-font">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label 
                    htmlFor="input-email" 
                    className="block mono-font text-xs uppercase tracking-wider text-[#21261F] font-semibold mb-2"
                  >
                    3. Email Address <span className="text-[#C1442B]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6B6F66] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@school.edu"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-[6px] bg-[#F7F5EF] border text-sm text-[#21261F] placeholder-[#6B6F66]/70 focus:outline-none focus:bg-[#FFFFFF] transition-colors ${
                        errors.email ? 'border-[#C1442B]' : 'border-[#DEDACE] focus:border-[#3B5BA5]'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#C1442B] mono-font">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Optional Student Affiliation Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div>
                  <label 
                    htmlFor="input-student-id" 
                    className="block mono-font text-xs uppercase tracking-wider text-[#6B6F66] font-semibold mb-2"
                  >
                    Student ID # <span className="text-[10px] lowercase text-[#6B6F66]">(optional)</span>
                  </label>
                  <input
                    id="input-student-id"
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. STU-84920"
                    className="w-full px-4 py-2.5 rounded-[6px] bg-[#F7F5EF] border border-[#DEDACE] text-sm text-[#21261F] placeholder-[#6B6F66]/70 focus:outline-none focus:border-[#3B5BA5] focus:bg-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="select-grade-level" 
                    className="block mono-font text-xs uppercase tracking-wider text-[#6B6F66] font-semibold mb-2"
                  >
                    Cohort / Affiliation
                  </label>
                  <select
                    id="select-grade-level"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[6px] bg-[#F7F5EF] border border-[#DEDACE] text-sm text-[#21261F] focus:outline-none focus:border-[#3B5BA5] focus:bg-[#FFFFFF]"
                  >
                    <option value="Grade 9">Grade 9 (Freshman)</option>
                    <option value="Grade 10">Grade 10 (Sophomore)</option>
                    <option value="Grade 11">Grade 11 (Junior)</option>
                    <option value="Grade 12">Grade 12 (Senior)</option>
                    <option value="Faculty">Faculty & Staff</option>
                    <option value="Parent/Guest">Parent / Visitor</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#DEDACE] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs mono-font text-[#6B6F66] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#7FA98C]" />
                  <span>No payment required for school events</span>
                </div>

                <button
                  id="btn-submit-registration"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto btn-blue cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Processing Pass...' : 'Submit Registration'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Ticket Stub */
          <div 
            id="registration-ticket-confirmation"
            className="school-card p-6 sm:p-8 relative"
          >
            {/* Top Confirmed Stamp Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-dashed border-[#DEDACE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7FA98C]/20 border border-[#7FA98C] flex items-center justify-center text-[#21261F]">
                  <CheckCircle2 className="w-6 h-6 text-[#21261F]" />
                </div>
                <div>
                  <h3 className="serif-font text-xl font-bold text-[#21261F]">
                    Registration Confirmed!
                  </h3>
                  <p className="mono-font text-xs text-[#6B6F66]">
                    Pass Code: <strong className="text-[#21261F]">{confirmation.ticketNumber}</strong>
                  </p>
                </div>
              </div>

              {/* Stamp Badge */}
              <div className="stamp stamp-mint rotate-[-1deg] text-xs">
                <span>OFFICIALLY REGISTERED</span>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-dashed border-[#DEDACE]">
              <div className="space-y-3">
                <div>
                  <span className="block mono-font text-[11px] uppercase text-[#6B6F66]">Event Name</span>
                  <p className="serif-font text-lg font-bold text-[#21261F]">{confirmation.event.name}</p>
                </div>

                <div>
                  <span className="block mono-font text-[11px] uppercase text-[#6B6F66]">Category & Code</span>
                  <p className="mono-font text-xs text-[#21261F]">
                    {confirmation.event.categoryEmoji} {confirmation.event.categoryLabel} • {confirmation.event.badgeCode}
                  </p>
                </div>

                <div>
                  <span className="block mono-font text-[11px] uppercase text-[#6B6F66]">Venue</span>
                  <p className="text-sm font-semibold text-[#21261F]">{confirmation.event.venue}</p>
                </div>
              </div>

              <div className="space-y-3 sm:border-l sm:border-dashed sm:border-[#DEDACE] sm:pl-6">
                <div>
                  <span className="block mono-font text-[11px] uppercase text-[#6B6F66]">Attendee</span>
                  <p className="text-base font-bold text-[#21261F]">{confirmation.registrantName}</p>
                  <p className="mono-font text-xs text-[#6B6F66]">{confirmation.email}</p>
                </div>

                <div>
                  <span className="block mono-font text-[11px] uppercase text-[#6B6F66]">Date & Time</span>
                  <p className="text-xs font-semibold text-[#21261F]">
                    {confirmation.event.date} • {confirmation.event.time}
                  </p>
                </div>

                <div>
                  <span className="block mono-font text-[11px] uppercase text-[#6B6F66]">Registered On</span>
                  <p className="mono-font text-xs text-[#6B6F66]">{confirmation.timestamp}</p>
                </div>
              </div>
            </div>

            {/* Visual Barcode Stub */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="h-8 w-48 bg-[repeating-linear-gradient(90deg,#21261F,#21261F_2px,transparent_2px,transparent_4px,#21261F_4px,#21261F_7px,transparent_7px,transparent_9px)]" />
                <span className="block mono-font text-[10px] text-[#6B6F66] tracking-widest uppercase">
                  {confirmation.ticketNumber} • SCAN AT ENTRANCE
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-[#DEDACE] bg-[#F7F5EF] text-xs mono-font font-medium text-[#21261F] hover:bg-[#FFFFFF] card-shadow cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Pass</span>
                </button>

                <button
                  onClick={handleReset}
                  className="btn-blue text-xs py-2 px-4"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Register Another</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
