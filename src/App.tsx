import AppRouter from "./routes/AppRouter";
import { routes } from "./routes/routes";
import "./App.css";
import ApiContextProvider from "./context/ApiContext";

// App component: Root component of the application.
// It loads the custom router and provides the application's route configuration.
export default function App() {
  return (
    <ApiContextProvider>
      <AppRouter routes={routes} />
    </ApiContextProvider>
  );
}
