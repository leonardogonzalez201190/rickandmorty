
// navigate function: A lightweight navigation helper that updates the browser URL
// and triggers a route change without refreshing the page.
export const navigate = (to: string): void => {
    window.history.pushState({}, "", to);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  