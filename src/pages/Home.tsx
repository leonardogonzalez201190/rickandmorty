import { navigate } from "../routes";

// Home page: Entry view of the application. Demonstrates navigation to the Details page
// using the custom router logic.
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate("/details/1")}>
        Go to Details of Character 1
      </button>
    </div>
  );
}
