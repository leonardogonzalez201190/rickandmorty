
// getRouteParam: Extracts a dynamic parameter from a URL based on a route pattern.
// Example: getRouteParam("/details/:id", "/details/10") -> "10"
export function getRouteParam(pattern: string, path: string, param: string): string | null {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");
  
    if (patternParts.length !== pathParts.length) return null;
  
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(":") && patternParts[i].slice(1) === param) {
        return pathParts[i];
      }
    }
  
    return null;
  }
  