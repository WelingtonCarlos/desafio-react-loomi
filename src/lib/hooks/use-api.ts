// Hook básico exemplo com TanStack Query
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/http-client';

// Exemplo simples de hook
export function useTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: () => api.get('/tickets'),
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/dashboard'),
  });
}
