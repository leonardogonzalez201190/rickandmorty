// Home page: Main entry view of the application.
// It displays the list of Rick and Morty characters using the CharactersList container.

import { CharactersList } from "../containers";

export default function Home() {
  return (
    <div className="page-container">
      {/* Characters list container */}
      <h2>Characters List</h2>
      <CharactersList />
    </div>
  );
}
