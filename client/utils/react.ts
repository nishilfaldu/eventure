import type { ReactElement, ReactNode } from "react";
import { useEffect, useState, isValidElement } from "react";



export function isValidReactElement<T>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: {} | undefined | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): object is ReactElement<T> {
  return (
    typeof object === "boolean" ||
    typeof object === "number" ||
    typeof object === "string" ||
    typeof object === "symbol" ||
    object === undefined ||
    object === null ||
    isValidElement(object)
  );
}

export function isValidReactNode(
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: {} | undefined | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): object is ReactNode {
  return isValidReactElement(object);
}



export interface IWindowSize {
  width: number;
  height: number;
}
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<IWindowSize | undefined>();

  useEffect(() => {
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
