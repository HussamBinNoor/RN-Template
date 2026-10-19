import { dayjs, formatDate, formatDateTime, fromNow, daysBetween } from '@/utils/date';

describe('date utilities', () => {
  const fixed = new Date('2026-03-15T12:00:00.000Z');

  it('formatDate produces a readable short string', () => {
    expect(formatDate(fixed)).toBe('Mar 15, 2026');
  });

  it('formatDate accepts custom patterns', () => {
    expect(formatDate(fixed, 'YYYY-MM-DD')).toBe('2026-03-15');
  });

  it('formatDateTime includes time', () => {
    expect(formatDateTime(fixed)).toContain('Mar 15, 2026');
    expect(formatDateTime(fixed)).toMatch(/\d{1,2}:\d{2}/);
  });

  it('fromNow returns a human relative phrase', () => {
    const past = dayjs().subtract(2, 'hour');
    expect(fromNow(past)).toMatch(/ago|hours?/);
  });

  it('daysBetween is always non-negative', () => {
    const a = new Date('2026-01-01');
    const b = new Date('2026-01-10');
    expect(daysBetween(a, b)).toBe(9);
    expect(daysBetween(b, a)).toBe(9);
  });

  it('dayjs is the re-exported default', () => {
    expect(dayjs().isValid()).toBe(true);
  });
});
