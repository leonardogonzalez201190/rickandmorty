// Home page: Main entry view of the application.
// It displays the list of Rick and Morty characters using the CharactersList container.

import { CharactersList } from "../containers";

export default function Home() {
  return (
    <div className="page-container">
      <CharactersList />
    </div>
  );
}
