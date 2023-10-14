export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null;

  return function debounced(...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

// Example usage:
// const expensiveOperation = (input: string) => {
//   console.log(`Performing expensive operation with input: ${input}`);
// };

// const debouncedOperation = debounce(expensiveOperation, 500);

// // Call debounced function
// debouncedOperation('input 1');
// debouncedOperation('input 2');
// debouncedOperation('input 3');

// Only 'Performing expensive operation with input: input 3' will be logged after 500ms
