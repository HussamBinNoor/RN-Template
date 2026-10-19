/**
 * Centralized TanStack Query key factory.
 * Keys are tuples so query keys stay type-safe and easy to invalidate.
 */
export const queryKeys = {
  todos: {
    all: ['todos'] as const,
    list: (limit?: number) => ['todos', 'list', { limit }] as const,
    detail: (id: string | number) => ['todos', 'detail', id] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string | number) => ['users', 'detail', id] as const,
  },
} as const;
