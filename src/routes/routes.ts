import Home from "../pages/Home";
import Details from "../pages/Details";

// Routes map: Defines the relationship between URL paths and React components.
// This map is consumed by the custom AppRouter.
export const routes = {
  "/": Home,
  "/details/1": Details
};
