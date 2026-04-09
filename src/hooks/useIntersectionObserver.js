import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, hasIntersected].
 * Once the element intersects the viewport it stays `true` (one-shot).
 */
export default function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasIntersected, options]);

  return [ref, hasIntersected];
}
