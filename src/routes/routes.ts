import Home from "../pages/Home";
import Details from "../pages/Details";

export const routes = {
  "/": Home,
  "/details/:id": Details, // now dynamic
};
