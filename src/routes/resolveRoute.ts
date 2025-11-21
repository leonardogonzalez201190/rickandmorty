// resolveRoute: Matches the current path against a route pattern and extracts
// dynamic parameters. Returns the matched component and its params.
// Example:
// pattern: "/details/:id"
// path: "/details/5"
// => { component: Details, params: { id: "5" } }

import type { ComponentType } from "react";

export interface ResolvedRoute {
  component: ComponentType<any>;
  params: Record<string, string>;
}

export function resolveRoute(
  routes: Record<string, ComponentType<any>>,
  path: string
): ResolvedRoute | null {
  // 1. Exact match
  if (routes[path]) {
    return { component: routes[path], params: {} };
  }

  // 2. Pattern match
  for (const pattern in routes) {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");

    if (patternParts.length !== pathParts.length) continue;

    let matched = true;
    const params: Record<string, string> = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternSeg = patternParts[i];
      const pathSeg = pathParts[i];

      if (patternSeg.startsWith(":")) {
        const paramName = patternSeg.slice(1);
        params[paramName] = pathSeg;
        continue;
      }

      if (patternSeg !== pathSeg) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return { component: routes[pattern], params };
    }
  }

  return null;
}
