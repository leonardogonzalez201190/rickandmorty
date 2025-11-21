import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { resolveRoute } from "./resolveRoute";

interface RoutesMap {
  [path: string]: ComponentType<any>;
}

interface AppRouterProps {
  routes: RoutesMap;
}

export default function AppRouter({ routes }: AppRouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const resolved = resolveRoute(routes, currentPath);
  const Component = resolved?.component || routes["/"];
  const params = resolved?.params || {};

  return <Component params={params} />;
}
