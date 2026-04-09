import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Minimum milliseconds between section transitions.
 * 900 ms feels natural on most displays while still being snappy enough
 * that users don't perceive lag when scrolling quickly.
 */
const THROTTLE_MS = 900;

/**
 * Provides section-based scroll navigation driven by mouse-wheel and touch swipe.
 *
 * @param {object} options
 * @param {number} options.count  Total number of sections.
 * @returns {{ activeSection: number, goToSection: (i: number) => void }}
 */
export default function useSectionScroll({ count }) {
  const [activeSection, setActiveSection] = useState(0);
  const lastTime = useRef(0);
  const touchStartY = useRef(null);

  const goToSection = useCallback(
    (index) => {
      setActiveSection(Math.max(0, Math.min(count - 1, index)));
    },
    [count]
  );

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTime.current < THROTTLE_MS) return;
      lastTime.current = now;
      setActiveSection((prev) =>
        e.deltaY > 0 ? Math.min(count - 1, prev + 1) : Math.max(0, prev - 1)
      );
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const now = Date.now();
      if (Math.abs(delta) > 50 && now - lastTime.current > THROTTLE_MS) {
        lastTime.current = now;
        setActiveSection((prev) =>
          delta > 0 ? Math.min(count - 1, prev + 1) : Math.max(0, prev - 1)
        );
      }
      touchStartY.current = null;
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        const now = Date.now();
        if (now - lastTime.current < THROTTLE_MS) return;
        lastTime.current = now;
        setActiveSection((prev) => Math.min(count - 1, prev + 1));
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        const now = Date.now();
        if (now - lastTime.current < THROTTLE_MS) return;
        lastTime.current = now;
        setActiveSection((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [count]);

  return { activeSection, goToSection };
}
