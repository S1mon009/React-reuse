import { useEffect, useRef } from "react";

export function useKeyboardShortcut(
  keys: string[],
  callback: () => void,
  element: HTMLElement | Window = window
) {
  const pressedKeys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      pressedKeys.current.add(event.key);

      // Check if all keys in the shortcut are pressed
      if (keys.every((key) => pressedKeys.current.has(key))) {
        callback();
      }
    };

    const handleKeyUp = (event: any) => {
      pressedKeys.current.delete(event.key);
    };

    element.addEventListener("keydown", handleKeyDown);
    element.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners
    return () => {
      element.removeEventListener("keydown", handleKeyDown);
      element.removeEventListener("keyup", handleKeyUp);
    };
  }, [keys, callback, element]);

  // Reset the pressed keys when the component unmounts
  useEffect(() => {
    return () => {
      pressedKeys.current.clear();
    };
  }, []);
}
