// matchRoute: Finds the correct route component by matching exact paths or patterns.
// Example: pattern "/details/:id" matches path "/details/7"

import type { ComponentType } from "react";

export function matchRoute(
  routes: Record<string, ComponentType<any>>,
  path: string
): ComponentType<any> | null {
  // 1. Exact match
  if (routes[path]) {
    return routes[path];
  }

  // 2. Pattern match (e.g. "/details/:id")
  for (const pattern in routes) {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");

    if (patternParts.length !== pathParts.length) continue;

    let matched = true;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(":")) continue; // dynamic segment OK
      if (patternParts[i] !== pathParts[i]) {
        matched = false;
        break;
      }
    }

    if (matched) return routes[pattern];
  }

  return null;
}
