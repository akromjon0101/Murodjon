import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/* Thin gold→blush bar at the very top that tracks reading progress.
   Plain scroll listener (rAF + interval fallback) — framer-motion's useScroll
   does not track reliably in this project. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (reduce) return undefined;
    let last = -1;
    const compute = () => {
      raf.current = 0;
      const doc = document.documentElement;
      const max = (doc.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (Math.abs(next - last) > 0.001) {
        last = next;
        setProgress(next);
      }
    };
    const schedule = () => {
      if (!raf.current) raf.current = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const id = window.setInterval(compute, 150);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.clearInterval(id);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
