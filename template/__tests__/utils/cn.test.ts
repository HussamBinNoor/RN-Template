import { cn } from '@/utils/cn';

describe('cn', () => {
  it('joins truthy class names with a space', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
  });
  it('drops falsy values', () => {
    expect(cn('a', undefined, null, false, 'b')).toBe('a b');
  });
  it('coerces numbers', () => {
    expect(cn('w', 12)).toBe('w 12');
  });
  it('handles empty list', () => {
    expect(cn()).toBe('');
  });
});
