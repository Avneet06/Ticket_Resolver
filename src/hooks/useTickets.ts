import { useState, useEffect } from 'react';
import { Ticket } from '../lib/types';
import { api } from '../lib/api';

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const data = await api.getTickets();
        setTickets(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load tickets: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
}