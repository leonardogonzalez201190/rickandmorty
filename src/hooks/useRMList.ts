// useRMList hook: Fetches a list of Rick and Morty characters from the public API.
// This basic implementation supports loading and error states and is ready to be

// useRMList hook: Now supports sorting the list of characters (asc/desc by name)

import { useEffect, useState } from "react";
import type { RMCharacter, RMApiInfo, RMApiResponse, SortOrder } from "../types/rm.types";


export function useRMList(initialPage: number = 1) {
  const [characters, setCharacters] = useState<RMCharacter[]>([]);
  const [info, setInfo] = useState<RMApiInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [reloadToken, setReloadToken] = useState<number>(0);

  // NEW: sorting state
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: RMApiResponse = await response.json();

        if (!isMounted) return;

        let sortedResults = [...data.results];

        // Apply sorting by name
        if (sortOrder === "asc") {
          sortedResults.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === "desc") {
          sortedResults.sort((a, b) => b.name.localeCompare(a.name));
        }

        setCharacters(sortedResults);
        setInfo(data.info);
      } catch (err) {
        if (!isMounted) return;
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCharacters();

    return () => {
      isMounted = false;
    };
  }, [page, reloadToken, sortOrder]);

  const reload = () => setReloadToken((prev) => prev + 1);

  return {
    characters,
    info,
    loading,
    error,
    page,
    setPage,
    reload,
    sortOrder,
    setSortOrder, // <- expose setter
  };
}