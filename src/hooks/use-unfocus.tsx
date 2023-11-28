import { useEffect } from "react";

export function useUnfocus(
  ref: React.RefObject<HTMLInputElement>,
  handler: () => void
) {
  const listener = (event: MouseEvent): void => {
    // Мне не удалось избавиться от "as" в строке ниже.
    // Описание event.target данным способом взял в интернете.
    const target = event?.target as HTMLInputElement;
    const element = ref?.current;

    if (!element || element === target) {
      return;
    }

    handler();
  };

  useEffect(() => {
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, listener]);
}
