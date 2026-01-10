// Details page: Displays detailed information for a single character.
// The character ID is extracted from the URL using a custom route param parser.

import { BackButton } from "../components";
import { useRMDetail } from "../hooks/useRMDetail";

export default function Details({ params }: { params: { id: string } }) {

  const { id } = params;
  const { character, loading, error } = useRMDetail(id);

  return (
    <article className="details-container">
      <h2 style={{ padding: "16px" }}>Details</h2>

      <BackButton />

      {loading && <p>Loading character...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && character && (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <img
            src={character.image}
            alt={character.name}
            width={200}
            height={200}
            style={{ borderRadius: "12px" }}
          />

          <h2>{character.name}</h2>
          <footer className="details-footer">
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
          </footer>
        </div>
      )}
    </article>
  );
}
