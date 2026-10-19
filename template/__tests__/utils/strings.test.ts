import { truncate, capitalize, initials, isNonEmptyString } from '@/utils/strings';

describe('strings', () => {
  describe('truncate', () => {
    it('returns the original value when shorter than max', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });
    it('truncates with an ellipsis when longer than max', () => {
      expect(truncate('hello world', 6)).toBe('hello…');
    });
    it('defaults to 50', () => {
      const long = 'a'.repeat(60);
      expect(truncate(long)).toHaveLength(50);
    });
  });

  describe('capitalize', () => {
    it('uppercases the first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });
    it('leaves already-capitalized strings intact', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('initials', () => {
    it('returns first letter of single name', () => {
      expect(initials('Jane')).toBe('J');
    });
    it('returns up to two initials from full name', () => {
      expect(initials('Jane Marie Doe')).toBe('JM');
    });
    it('trims whitespace', () => {
      expect(initials('  bob  ')).toBe('B');
    });
    it('handles empty string', () => {
      expect(initials('')).toBe('');
    });
  });

  describe('isNonEmptyString', () => {
    it('rejects non-strings', () => {
      expect(isNonEmptyString(0)).toBe(false);
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(undefined)).toBe(false);
      expect(isNonEmptyString([])).toBe(false);
    });
    it('rejects empty strings', () => {
      expect(isNonEmptyString('')).toBe(false);
    });
    it('accepts non-empty strings', () => {
      expect(isNonEmptyString('hi')).toBe(true);
    });
  });
});
