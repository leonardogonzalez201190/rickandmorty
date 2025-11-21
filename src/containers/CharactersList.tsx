import { CharacterCard, CharacterCardSkeleton, OrderControl } from "../components";
import { useRMList } from "../hooks";
import { navigate } from "../routes";
import type { SortOrder } from "../types/rm.types";

export function CharactersList() {
  const {
    characters,
    loading,
    error,
    page,
    setPage,
    info,
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
  } = useRMList();


  return (
    <div style={{ width: "100%" }}>
      {/* Top bar */}
      <div
        className="characters-topbar"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h2 style={{ margin: 0 }}>Characters List</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="characters-search"
          value={searchTerm}               // 👈 conectamos el valor
          onChange={(e) => setSearchTerm(e.target.value)}   // 👈 actualizamos el hook
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            minWidth: "180px",
          }}
        />

        {/* Sorting control */}
        <OrderControl
          sortOrder={sortOrder}
          onChange={(next: SortOrder) => setSortOrder(next)}
        />

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button disabled={!info?.prev} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            {page} / {info?.pages ?? "?"}
          </span>

          <button disabled={!info?.next} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <p>Loading characters...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List */}
      {!loading && !error && (
        <div className="responsive-grid">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
              <CharacterCardSkeleton key={i} />
            ))
            : characters.map((c) => (
              <CharacterCard
                key={c.id}
                character={c}
                onClick={() => navigate(`/details/${c.id}`)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
