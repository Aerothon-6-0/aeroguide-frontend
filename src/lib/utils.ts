import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment-timezone'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function time(input : Date){
  const utcTime = moment.utc(input);

// Convert to Indian Standard Time (IST)
const istTime = utcTime.tz('Asia/Kolkata');

// Get the time in IST
const istTimeString = istTime.format('HH:mm');

return istTimeString;
}

export function date(input : Date){
  const utcTime = moment.utc(input);

// Convert to Indian Standard Time (IST)
const istTime = utcTime.tz('Asia/Kolkata');

// Get the time in IST
const istDateString = istTime.format('MMM-DD');


return istDateString;
}
