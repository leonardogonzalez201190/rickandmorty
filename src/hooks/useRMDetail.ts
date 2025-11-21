// useRMDetail hook: Fetches a single character by ID from the Rick and Morty API.
// Supports loading and error states. Intended for use in the Details page.

import { useEffect, useState } from "react";
import type { RMCharacter } from "../types/rm.types";

export function useRMDetail(id: string | null) {
  const [character, setCharacter] = useState<RMCharacter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid character ID");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

        if (!res.ok) throw new Error(`Failed to fetch character (${res.status})`);

        const data: RMCharacter = await res.json();

        if (isMounted) {
          setCharacter(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCharacter();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { character, loading, error };
}
