// Slot generation in Asia/Colombo timezone
const { format, addDays, startOfDay, endOfDay, isWithinInterval } = require('date-fns');
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');

const TIMEZONE = 'Asia/Colombo';

/**
 * Generate available time slots for a specific date
 * @param {Date} date - Date to generate slots for
 * @param {Array} existingBookings - Existing bookings for the day
 * @param {Object} schedule - Therapist/clinic schedule
 * @param {number} slotDuration - Duration of each slot in minutes (default: 60)
 * @returns {Array} Array of available time slots
 */
const generateTimeSlots = (date, existingBookings = [], schedule = {}, slotDuration = 60) => {
  const slots = [];
  
  // Default schedule (9 AM to 6 PM)
  const defaultSchedule = {
    startTime: '09:00',
    endTime: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  };

  const workSchedule = { ...defaultSchedule, ...schedule };
  
  // Convert to Sri Lanka timezone
  const sriLankaDate = utcToZonedTime(date, TIMEZONE);
  const startOfDayTime = startOfDay(sriLankaDate);
  const endOfDayTime = endOfDay(sriLankaDate);
  
  // Parse schedule times
  const [startHour, startMinute] = workSchedule.startTime.split(':').map(Number);
  const [endHour, endMinute] = workSchedule.endTime.split(':').map(Number);
  const [breakStartHour, breakStartMinute] = workSchedule.breakStart.split(':').map(Number);
  const [breakEndHour, breakEndMinute] = workSchedule.breakEnd.split(':').map(Number);
  
  // Create time slots
  let currentTime = new Date(startOfDayTime);
  currentTime.setHours(startHour, startMinute, 0, 0);
  
  const endTime = new Date(startOfDayTime);
  endTime.setHours(endHour, endMinute, 0, 0);
  
  const breakStart = new Date(startOfDayTime);
  breakStart.setHours(breakStartHour, breakStartMinute, 0, 0);
  
  const breakEnd = new Date(startOfDayTime);
  breakEnd.setHours(breakEndHour, breakEndMinute, 0, 0);
  
  while (currentTime < endTime) {
    const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
    
    // Skip break time
    if (currentTime < breakEnd && slotEnd > breakStart) {
      currentTime = breakEnd;
      continue;
    }
    
    // Check if slot is available
    const isBooked = existingBookings.some(booking => {
      const bookingStart = new Date(booking.dateTime);
      const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);
      
      return (currentTime < bookingEnd && slotEnd > bookingStart);
    });
    
    if (!isBooked) {
      slots.push({
        startTime: new Date(currentTime),
        endTime: new Date(slotEnd),
        duration: slotDuration,
        available: true
      });
    }
    
    currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
  }
  
  return slots;
};

/**
 * Check if a specific time slot is available
 * @param {Date} startTime - Start time of the slot
 * @param {number} duration - Duration in minutes
 * @param {Array} existingBookings - Existing bookings
 * @returns {boolean} True if slot is available
 */
const isSlotAvailable = (startTime, duration, existingBookings = []) => {
  const endTime = new Date(startTime.getTime() + duration * 60000);
  
  return !existingBookings.some(booking => {
    const bookingStart = new Date(booking.dateTime);
    const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);
    
    return (startTime < bookingEnd && endTime > bookingStart);
  });
};

/**
 * Get next available date with slots
 * @param {Array} existingBookings - Existing bookings
 * @param {Object} schedule - Schedule configuration
 * @param {number} daysAhead - Number of days to check ahead (default: 30)
 * @returns {Date|null} Next available date or null
 */
const getNextAvailableDate = (existingBookings = [], schedule = {}, daysAhead = 30) => {
  const today = new Date();
  
  for (let i = 0; i < daysAhead; i++) {
    const checkDate = addDays(today, i);
    const slots = generateTimeSlots(checkDate, existingBookings, schedule);
    
    if (slots.length > 0) {
      return checkDate;
    }
  }
  
  return null;
};

/**
 * Format time slot for display
 * @param {Date} startTime - Start time
 * @param {Date} endTime - End time
 * @returns {string} Formatted time string
 */
const formatTimeSlot = (startTime, endTime) => {
  return `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
};

/**
 * Get business hours for a specific day
 * @param {Date} date - Date to get hours for
 * @param {Object} schedule - Schedule configuration
 * @returns {Object} Business hours object
 */
const getBusinessHours = (date, schedule = {}) => {
  const defaultSchedule = {
    startTime: '09:00',
    endTime: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  };

  const workSchedule = { ...defaultSchedule, ...schedule };
  
  return {
    startTime: workSchedule.startTime,
    endTime: workSchedule.endTime,
    breakStart: workSchedule.breakStart,
    breakEnd: workSchedule.breakEnd,
    timezone: TIMEZONE
  };
};

module.exports = {
  generateTimeSlots,
  isSlotAvailable,
  getNextAvailableDate,
  formatTimeSlot,
  getBusinessHours,
  TIMEZONE
};
