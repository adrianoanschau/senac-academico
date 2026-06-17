import { useEffect, type RefObject } from 'react';
import { ViewMode } from 'gantt-task-react';

/** A lib gantt-task-react renderiza semanas como "W12" — substituímos por "Sem. 12". */
export function usePortugueseWeekLabels(
  containerRef: RefObject<HTMLElement | null>,
  viewMode: ViewMode = ViewMode.Week,
) {
  useEffect(() => {
    if (viewMode !== ViewMode.Week) return;

    const root = containerRef.current;
    if (!root) return;

    const localize = () => {
      root.querySelectorAll('text').forEach((node) => {
        const text = node.textContent?.trim() ?? '';
        const match = /^W(\d{1,2})$/.exec(text);
        if (match) {
          node.textContent = `Sem. ${match[1]}`;
        }
      });
    };

    localize();

    const observer = new MutationObserver(localize);
    observer.observe(root, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [containerRef, viewMode]);
}
