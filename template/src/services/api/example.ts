import { useQuery } from '@tanstack/react-query';
import { apiGet } from './client';
import { queryKeys } from './queryKeys';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export function useTodosQuery(limit = 10) {
  return useQuery({
    queryKey: queryKeys.todos.list(limit),
    queryFn: () => apiGet<Todo[]>(`/todos?_limit=${limit}`),
  });
}

export function useUserQuery(id: number | string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => apiGet<User>(`/users/${id}`),
    enabled: Boolean(id),
  });
}
