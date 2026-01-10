import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { RMCharacter, RMApiInfo, SortOrder, RMApiResponse } from '../types/rm.types';

export const ApiContext = createContext<any>(null);

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within a ApiProvider');
    }
    return context;
};

export default function ApiContextProvider({ children }: { children: ReactNode }) {

    const [characters, setCharacters] = useState<RMCharacter[]>([]);
    const [info, setInfo] = useState<RMApiInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Read all parameters from URL on start
    const urlParams = new URLSearchParams(window.location.search);

    const [queryParams, setQueryParams] = useState({
        page: Number(urlParams.get("page")) || 1,
        name: urlParams.get("name") || "",
        sort: (urlParams.get("sort") as SortOrder) || "none",
        status: urlParams.get("status") || "",
        species: urlParams.get("species") || "",
        gender: urlParams.get("gender") || "",
    });


    // Sync ALL queryParams state with the URL (one effect)
    useEffect(() => {
        const params = new URLSearchParams();

        if (queryParams.page > 1) params.set("page", String(queryParams.page));
        if (queryParams.name.trim() !== "") params.set("name", queryParams.name.trim());
        if (queryParams.sort !== "none") params.set("sort", queryParams.sort);
        if (queryParams.status) params.set("status", queryParams.status);
        if (queryParams.species) params.set("species", queryParams.species);
        if (queryParams.gender) params.set("gender", queryParams.gender);

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", newUrl);
    }, [queryParams]);

    // Fetch data from Rick & Morty API when queryParams change
    useEffect(() => {
        let isMounted = true;

        const fetchCharacters = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams();

                params.set("page", String(queryParams.page));

                if (queryParams.name.trim() !== "") {
                    params.set("name", queryParams.name.trim());
                }
                if (queryParams.status) params.set("status", queryParams.status);
                if (queryParams.species) params.set("species", queryParams.species);
                if (queryParams.gender) params.set("gender", queryParams.gender);

                const response = await fetch(
                    `https://rickandmortyapi.com/api/character?${params.toString()}`
                );

                if (!response.ok) {
                    if (response.status === 404) {
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

                // SORT local
                if (queryParams.sort === "asc") {
                    results.sort((a, b) => a.name.localeCompare(b.name));
                } else if (queryParams.sort === "desc") {
                    results.sort((a, b) => b.name.localeCompare(a.name));
                }

                setCharacters(results);
                setInfo(data.info);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Unknown error occurred";
                if (isMounted) setError(message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCharacters();

        return () => {
            isMounted = false;
        };
    }, [queryParams]);
    
    const updateQueryParams = (newParams: any) => {
        setQueryParams((prev) => ({ ...prev, ...newParams }));
    };

    return (
        <ApiContext.Provider
            value={{
                characters,
                info,
                loading,
                error,
                queryParams,
                updateQueryParams,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
}