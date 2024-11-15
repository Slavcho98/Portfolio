import { add } from "date-fns";

export function fromToday(numDays: number, withTime: boolean = false): string {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export function specificDate(
  year: number,
  month: number,
  day: number,
  withTime: boolean = false
): string {
  const date = new Date(year, month - 1, day);
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const sampleEventSchedule = {
  created_at: fromToday(-20, true),
  events: specificDate(new Date().getFullYear(), 10, 14),
  title: "HR Викенд",
  duration: "2 часа",
  description:
    "Овој четврток кафе на тема како да примените техники и чекори од селф коучинг за подобро да се водите себеси...", // Description of the event
};
