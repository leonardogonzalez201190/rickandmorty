// CharactersList container: Connects the useRMList hook with the UI layer.
// It handles loading, error and data rendering states and prepares the
// component for future pagination, filtering and ordering features.
import { useRMList } from "../hooks";

export function CharactersList() {
  
  const { characters, loading, error, page, setPage, info } = useRMList();

  return (loading ? <p>Loading characters...</p> : error ? <p style={{ color: "red" }}>Error: {error}</p> : (
    <>
      {/* Characters List */}
      {!loading && !error && (
        <div className="responsive-grid">
          {characters.map((character) => (
            <div key={character.id}>
              {character.name}
            </div>
          ))}
        </div>
      )}

      {/* Pagination - basic version */}
      {!loading && info && (
        <div style={{ marginTop: "16px" }}>
          <button
            disabled={!info.prev}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 8px" }}>
            Page {page} of {info.pages}
          </span>

          <button
            disabled={!info.next}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
  );
}
