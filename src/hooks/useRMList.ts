// useRMList hook: Fetches a list of Rick and Morty characters from the public API.
// This basic implementation supports loading and error states and is ready to be
// extended later with pagination, ordering and filtering.

import { useEffect, useState } from "react";
import type {
    RMCharacter,
    RMApiInfo,
    RMApiResponse,
    UseRMListState
} from "../types/rm.types";


const API_BASE_URL = "https://rickandmortyapi.com/api/character";


export function useRMList(initialPage: number = 1): UseRMListState {
    const [characters, setCharacters] = useState<RMCharacter[]>([]);
    const [info, setInfo] = useState<RMApiInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(initialPage);
    const [reloadToken, setReloadToken] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;

        const fetchCharacters = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_BASE_URL}?page=${page}`);

                if (!response.ok) {
                    // Basic error handling for non-2xx responses
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data: RMApiResponse = await response.json();

                if (!isMounted) return;

                // Store characters list and pagination info
                setCharacters(data.results);
                setInfo(data.info);
            } catch (err) {
                if (!isMounted) return;

                // Fallback error message in case we don't have a specific one
                const message =
                    err instanceof Error ? err.message : "Unknown error occurred";
                setError(message);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCharacters();

        // Cleanup to avoid setting state on unmounted component
        return () => {
            isMounted = false;
        };
    }, [page, reloadToken]);

    const reload = () => {
        // Simple way to trigger a refetch without changing the page
        setReloadToken((prev) => prev + 1);
    };

    return {
        characters,
        info,
        loading,
        error,
        page,
        setPage,
        reload,
    };
}
