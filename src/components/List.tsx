import { useApi } from "../context/ApiContext";
import type { RMCharacter } from "../types/rm.types";
import { navigate } from "../routes";

export function List() {

    const { characters, loading } = useApi();

    return (
        <section className="list">
            {loading ? (
                <p>Loading...</p>
            ) : characters.length === 0 ? (
                <p>No characters found.</p>
            ) : (
                characters.map((character: RMCharacter) => (
                    <article key={character.id} className="list__item" onClick={() => navigate(`/details/${character.id}`)}>
                        <img
                            src={character.image}
                            alt={character.name}
                            style={{ width: "100%", height: "auto" }}
                        />
                        <footer style={{ lineHeight: "normal" }}>
                            <h3>{character.name}</h3>
                            <small>{character.status}</small>
                        </footer>
                    </article>
                ))
            )}
        </section>
    )
}