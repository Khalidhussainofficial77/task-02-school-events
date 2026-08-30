export type EventCategory = 'sports' | 'workshops' | 'competitions' | 'clubs';

export type EventStatus = 'open' | 'full';

export interface SchoolEvent {
  id: string;
  name: string;
  category: EventCategory;
  categoryLabel: string;
  categoryEmoji: string;
  date: string;
  time: string;
  venue: string;
  status: EventStatus;
  spotsLeft?: number;
  description: string;
  organizer: string;
  targetAudience: string;
  entryFee?: string;
  accentColor: string;
  iconName: string;
  badgeCode: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  eventId: string;
  studentId?: string;
  gradeLevel?: string;
  notes?: string;
}

export interface RegistrationConfirmation {
  ticketNumber: string;
  event: SchoolEvent;
  registrantName: string;
  email: string;
  timestamp: string;
}
