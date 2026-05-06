import { type PointerEvent as ReactPointerEvent, useCallback, useRef, useState } from "react";

/** Попадание указателя в одну из ячеек сетки (bounding box), координаты относительно ячейки. */
export type PointerGridHit = { idx: number; x: number; y: number } | null;

/**
 * Общая логика для Features / HowItWorks: хит-тест по DOM-ячейкам, зазоры между карточками = мимо всех.
 */
export function usePointerGridHit(cellCount: number) {
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hit, setHit] = useState<PointerGridHit>(null);

  const bindCellRef = useCallback((index: number) => (node: HTMLDivElement | null) => {
    cellRefs.current[index] = node;
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      let next: NonNullable<PointerGridHit> | null = null;
      for (let i = 0; i < cellCount; i++) {
        const node = cellRefs.current[i];
        if (!node) continue;
        const r = node.getBoundingClientRect();
        if (
          e.clientX >= r.left &&
          e.clientX < r.right &&
          e.clientY >= r.top &&
          e.clientY < r.bottom
        ) {
          next = { idx: i, x: e.clientX - r.left, y: e.clientY - r.top };
          break;
        }
      }
      setHit(next);
    },
    [cellCount],
  );

  const onPointerLeave = useCallback(() => {
    setHit(null);
  }, []);

  return { hit, bindCellRef, onPointerMove, onPointerLeave };
}
