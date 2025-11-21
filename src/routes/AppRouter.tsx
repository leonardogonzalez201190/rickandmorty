import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { matchRoute } from "./matchRoute";

interface RoutesMap {
  [path: string]: ComponentType<any>;
}

interface AppRouterProps {
  routes: RoutesMap;
}

export default function AppRouter({ routes }: AppRouterProps) {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const RouteComponent =
    matchRoute(routes, currentPath) || routes["/"];

  return <RouteComponent />;
}
