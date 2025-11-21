// debounce: Delays execution of a function until a period of inactivity has passed.
// Useful for search inputs and API calls.

export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: number | undefined;
  
    return (...args: Parameters<T>) => {
      if (timer) {
        window.clearTimeout(timer);
      }
  
      timer = window.setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  