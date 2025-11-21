import type { ChangeEvent } from "react";
import {
  CharacterCard,
  CharacterCardSkeleton,
  OrderControl,
  StatusFilter,
  SpeciesFilter,
  GenderFilter,
} from "../components";
import { useRMList } from "../hooks";
import { navigate } from "../routes";
import type { SortOrder } from "../types/rm.types";
import { debounce } from "../utils/debounce";

export function CharactersList() {
  const {
    characters,
    loading,
    error,
    queryParams,
    setPage,
    info,
    setSort,
    setSearch,
    setStatus,
    setSpecies,
    setGender,
    resetFilters,
  } = useRMList();

  return (
    <div style={{ width: "100%" }}>

      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "28px" }}>Rick and Morty List</h2>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search characters..."
            defaultValue={queryParams.name}
            onChange={debounce(
              (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
              400
            )}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button onClick={resetFilters}>Clear Filters</button>
        </div>
      </div>

      {/* Filters Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatusFilter value={queryParams.status} onChange={setStatus} />
        <SpeciesFilter value={queryParams.species} onChange={setSpecies} />
        <GenderFilter value={queryParams.gender} onChange={setGender} />

        <OrderControl
          sortOrder={queryParams.sort}
          onChange={(next: SortOrder) => setSort(next)}
        />
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <button
          disabled={!info?.prev}
          onClick={() => setPage(queryParams.page - 1)}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: info?.prev ? "pointer" : "not-allowed",
          }}
        >
          Prev
        </button>

        <span style={{ fontSize: "16px", fontWeight: 500 }}>
          {queryParams.page} / {info?.pages ?? "?"}
        </span>

        <button
          disabled={!info?.next}
          onClick={() => setPage(queryParams.page + 1)}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: info?.next ? "pointer" : "not-allowed",
          }}
        >
          Next
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading characters...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List */}
      {!loading && !error && (
        <div className="responsive-grid">
          {characters.map((c) => (
            <CharacterCard
              key={c.id}
              character={c}
              onClick={() => navigate(`/details/${c.id}`)}
            />
          ))}
        </div>
      )}

      {/* Skeleton fallback */}
      {loading && (
        <div className="responsive-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
