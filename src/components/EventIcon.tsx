import React from 'react';
import { 
  Trophy, 
  BookOpen, 
  Award, 
  Sparkles, 
  Wrench, 
  Flame, 
  Cpu, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Tag
} from 'lucide-react';

interface EventIconProps {
  name: string;
  className?: string;
}

export const EventIcon: React.FC<EventIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Trophy':
      return <Trophy className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'AlertCircle':
      return <AlertCircle className={className} />;
    default:
      return <Tag className={className} />;
  }
};
