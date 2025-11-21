import { navigate } from "../routes";

// Details page: Displays detail information for a selected item.
// Navigation back to Home is handled through the custom navigation function.
export default function Details() {
  return (
    <div>
      <h1>Details Page</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
