// CharacterCard component: Displays a character image and basic information.
// Designed to be simple, responsive and easy to extend. It also includes a
// loading skeleton state for improved UX during data fetch.

import type { CharacterCardProps } from "../../types/rm.types";
import "../../styles/CharacterCard.css";


export const CharacterCard = ({
  character,
  isLoading = false,
  onClick
}: CharacterCardProps) => {
  return (
    <div
      className="character-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Image */}
      <div className={`character-card__image ${isLoading ? "loading" : ""}`}>
        {!isLoading && character?.image && (
          <img
            src={character.image}
            alt={character.name}
            loading="lazy"
          />
        )}
      </div>

      {/* Content */}
      <div className="character-card__content">
        <h3 className={`character-card__title ${isLoading ? "loading" : ""}`}>
          {!isLoading ? character?.name : ""}
        </h3>
      </div>
    </div>
  );
};

// Skeleton version for loading
export const CharacterCardSkeleton = () => {
  return <CharacterCard character={null} isLoading={true} />;
};
