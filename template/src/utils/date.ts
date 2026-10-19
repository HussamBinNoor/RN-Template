import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(advancedFormat);

export { dayjs };

/** Format an ISO date for display. */
export const formatDate = (iso: string | Date | dayjs.Dayjs, pattern = 'MMM D, YYYY'): string =>
  dayjs(iso).format(pattern);

/** Format a date with time. */
export const formatDateTime = (
  iso: string | Date | dayjs.Dayjs,
  pattern = 'MMM D, YYYY h:mm A',
): string => dayjs(iso).format(pattern);

/** Human-friendly relative time. */
export const fromNow = (iso: string | Date | dayjs.Dayjs): string => dayjs(iso).fromNow();

/** Difference in days between two dates (rounded). */
export const daysBetween = (a: string | Date, b: string | Date): number =>
  Math.abs(dayjs(a).diff(dayjs(b), 'day'));
