import { describe , test , it, expect, assert } from "vitest";
import { validateTimerForm } from "./validation";


describe('validateTimerForm' , ()=>{

    //Checking erro for title
    it('should return an error if the title is empty', () => {
        const data = { title: '', hours: 0, minutes: 0, seconds: 0 };
        const result = validateTimerForm({...data});
        expect(result).toBe('Title is required');
      });

      it('should return no error for valid data', () => {
        const data = { title: 'My Timer', hours: 1, minutes: 30, seconds: 45 };
        const result = validateTimerForm(data);
        expect(result).toBe('ok');
      });

      it('should trim whitespace from the title and validate it', () => {
        const data = { title: '   ', hours: 0, minutes: 0, seconds: 0 };
        const result = validateTimerForm(data);
        expect(result).toBe('Title is required');
      });

      it('should return an error if the title exceeds 50 characters', () => {
        const data = {
          title: 'Tushar is really great devloper you should definetly hire me.!',
          hours: 1,
          minutes: 30,
          seconds: 0,
        };
        const result = validateTimerForm(data);
        expect(result).toBe('Title must be less than 50 characters');
      });

     //Checking error for duration 
      it('should return an error if time values are negative', () => {
        const data = { title: 'Negative Time', hours: -1, minutes: 0, seconds: 0 };
        const result = validateTimerForm(data);
        expect(result).toBe('Time values cannot be negative');
      });

      it('should return an error if minutes or seconds exceed 59', () => {
        const data = { title: 'Invalid Minutes', hours: 0, minutes: 60, seconds: 0 };
        const result = validateTimerForm(data);
        expect(result).toBe('Minutes and seconds must be between 0 and 59');
    
        const data2 = { title: 'Invalid Seconds', hours: 0, minutes: 0, seconds: 60 };
        const result2 = validateTimerForm(data2);
        expect(result2).toBe('Minutes and seconds must be between 0 and 59');
      });

      it('should return an error if total time is zero', () => {
        const data = { title: 'Zero Time', hours: 0, minutes: 0, seconds: 0 };
        const result = validateTimerForm(data);
        expect(result).toBe('Please set a time greater than 0');
      });
    
      it('should return an error if total time exceeds 24 hours', () => {
        const data = { title: 'Exceeds Limit', hours: 25, minutes: 0, seconds: 0 };
        const result = validateTimerForm(data);
        expect(result).toBe('Timer cannot exceed 24 hours');
      });
    
      //If everything is ok
      it('should return no error for valid data', () => {
        const data = { title: 'Valid Timer', hours: 1, minutes: 30, seconds: 45 };
        const result = validateTimerForm(data);
        expect(result).toBe('ok');
      });

      it('should not return error if description is not present', () => {
        const data = { title: 'Valid Timer', hours: 1, minutes: 30, seconds: 45 };
        const result = validateTimerForm(data);
        expect(result).toBe('ok');
      });

      
})