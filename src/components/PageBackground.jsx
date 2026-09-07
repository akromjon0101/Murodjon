import { useMemo } from 'react';
import { wedding } from '../data/wedding.js';

/* Fixed decorative background — the couple's ceremony photo, softly blurred and
   washed out under a paper-coloured veil so every section stays readable, plus
   a scatter of gilded dust and a fine inset gold frame. */

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function PageBackground() {
  const dust = useMemo(() => {
    const rnd = seeded(20260910);
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: rnd() * 100,
      top: rnd() * 100,
      size: 1 + rnd() * 2.2,
      delay: rnd() * 8,
      dur: 5 + rnd() * 7,
      gold: rnd() > 0.45,
    }));
  }, []);

  return (
    <div className="page-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {wedding.bgPhoto && (
        <div
          className="page-bg__photo"
          style={{ backgroundImage: `url(${wedding.bgPhoto})` }}
        />
      )}
      <div className="page-bg__veil" />
      <div className="page-bg__glow" />

      {dust.map((d) => (
        <span
          key={d.id}
          className={`page-bg__dust ${d.gold ? 'page-bg__dust--gold' : ''}`}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}

      {/* fine inset frame with corner marks */}
      <div className="page-bg__frame">
        <span className="page-bg__corner page-bg__corner--tl" />
        <span className="page-bg__corner page-bg__corner--tr" />
        <span className="page-bg__corner page-bg__corner--bl" />
        <span className="page-bg__corner page-bg__corner--br" />
      </div>

      <div className="page-bg__grain" />
    </div>
  );
}
