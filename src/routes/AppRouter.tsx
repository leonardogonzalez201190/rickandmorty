import { useEffect, useState } from "react";
import type { ComponentType } from "react";

interface RoutesMap {
  [path: string]: ComponentType<any>;
}

interface AppRouterProps {
  routes: RoutesMap;
}

// AppRouter component: A minimal custom router that renders components based on the current URL path.
// It listens to browser navigation events and updates the view without reloading the page.
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

  const RouteComponent = routes[currentPath] || routes["/"];

  return <RouteComponent />;
}
