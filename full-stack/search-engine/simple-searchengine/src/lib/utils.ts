import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day} ${month} ${year}`;
}
