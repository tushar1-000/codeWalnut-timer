import { toast } from 'sonner';

export interface TimerFormData {
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export const validateTimerForm = (data: TimerFormData): string => {
  const { title, hours, minutes, seconds } = data;
  
  if (!title.trim()) {
    return  'Title is required'
    
  }

  if (title.length > 50) {
    return 'Title must be less than 50 characters';
    
  }

  if (hours < 0 || minutes < 0 || seconds < 0) {
    return 'Time values cannot be negative'
   
  }

  if (minutes > 59 || seconds > 59) {
    return 'Minutes and seconds must be between 0 and 59'
   
  }

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds === 0) {
    return 'Please set a time greater than 0'
   
  }

  if (totalSeconds > 86400) { // 24 hours
    return 'Timer cannot exceed 24 hours'
    
  }

  return 'ok';
};