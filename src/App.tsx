import AppRouter from "./routes/AppRouter";
import { routes } from "./routes/routes";

// App component: Root component of the application.
// It loads the custom router and provides the application's route configuration.
export default function App() {
  return <AppRouter routes={routes} />;
}
