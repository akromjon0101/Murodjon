import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Petal, Leaf } from './decor.jsx';

/* Ambient layer: a small number of slowly drifting petals & leaves plus a
   couple of butterflies — all pure CSS animation so the main thread stays
   free for scroll + reveal work. Fixed behind content, non-interactive. */

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function FloatingDecorations() {
  const reduce = useReducedMotion();

  const drifters = useMemo(() => {
    const rnd = seeded(20260910);
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      kind: i % 3 === 0 ? 'leaf' : 'petal',
      left: rnd() * 100,
      size: 11 + rnd() * 13,
      delay: -rnd() * 30,
      duration: 30 + rnd() * 18,
      sway: 30 + rnd() * 50,
    }));
  }, []);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {drifters.map((d) => (
        <span
          key={d.id}
          className="fd-drift absolute -top-12 block"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            '--sway': `${d.sway}px`,
          }}
        >
          {d.kind === 'petal' ? (
            <Petal className="h-full w-full" fill="#CFC7B6" />
          ) : (
            <Leaf className="h-full w-full" />
          )}
        </span>
      ))}
    </div>
  );
}
