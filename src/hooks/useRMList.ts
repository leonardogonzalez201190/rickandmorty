// useRMList hook: Fetches a paginated list of characters from the Rick and Morty API.
// Supports loading, error, sorting by name, search via API, debounce,
// and syncs search, page, and sortOrder with the URL.

import { useEffect, useRef, useState } from "react";
import type { RMCharacter, RMApiInfo, RMApiResponse, SortOrder } from "../types/rm.types";
import { debounce } from "../utils";

export function useRMList() {
  const [characters, setCharacters] = useState<RMCharacter[]>([]);
  const [info, setInfo] = useState<RMApiInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState<number>(0);

  // Read parameters from URL on first load
  const urlParams = new URLSearchParams(window.location.search);

  const initialSearch = urlParams.get("name") || "";
  const initialSort = (urlParams.get("sort") as SortOrder) || "none";
  const initialPage = Number(urlParams.get("page")) || 1;

  const [page, setPage] = useState<number>(initialPage);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSort);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const debounceRef = useRef<(value: string) => void>(null);


  // Avoid resetting page on initial load
  const isFirstSearchRun = useRef(true);

  // Reset page ONLY when user changes searchTerm (not on initial load)
  useEffect(() => {
    if (isFirstSearchRun.current) {
      isFirstSearchRun.current = false;
      return; // skip initial execution
    }
    setPage(1);
  }, [searchTerm]);

  // Debounce search updates
  useEffect(() => {
    debounceRef.current = debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 700);
  }, []);

  // Sync search, sort and page with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (searchTerm.trim() !== "") params.set("name", searchTerm.trim());
    else params.delete("name");

    if (sortOrder !== "none") params.set("sort", sortOrder);
    else params.delete("sort");

    if (page > 1) params.set("page", String(page));
    else params.delete("page");

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [searchTerm, sortOrder, page]);

  // Fetch characters from API
  useEffect(() => {
    let isMounted = true;

    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set("page", String(page));

        if (debouncedSearchTerm.trim() !== "") {
          params.set("name", debouncedSearchTerm.trim());
        }

        const response = await fetch(
          `https://rickandmortyapi.com/api/character?${params.toString()}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            // No results found
            if (isMounted) {
              setCharacters([]);
              setInfo(null);
              setError("No characters found");
            }
            return;
          }

          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: RMApiResponse = await response.json();

        if (!isMounted) return;

        let results = [...data.results];

        // Apply sorting by name
        if (sortOrder === "asc") {
          results.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === "desc") {
          results.sort((a, b) => b.name.localeCompare(a.name));
        }

        setCharacters(results);
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
  }, [page, reloadToken, sortOrder, debouncedSearchTerm]);

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
    setSortOrder,
    searchTerm,
    setSearchTerm,
  };
}
