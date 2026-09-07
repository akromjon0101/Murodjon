import { useReducedMotion } from 'framer-motion';
import useInViewport from '../hooks/useInViewport.js';
import { leafPath } from './decor.jsx';

/* A photo in a gilded frame — circle or arch — that fades and lifts into view
   on scroll, with optional gold leaf sprigs at its base. Pure CSS motion. */
export default function PhotoFrame({ src, shape = 'circle', sprigs = true, className = '' }) {
  const reduce = useReducedMotion();
  const [ref, active] = useInViewport();
  const on = active || reduce;

  return (
    <div
      ref={ref}
      className={`photo-frame photo-frame--${shape} ${on ? 'photo-frame--in' : ''} ${className}`}
    >
      {sprigs && (
        <>
          <span className="photo-frame__sprig photo-frame__sprig--l" aria-hidden="true">
            <Sprig />
          </span>
          <span className="photo-frame__sprig photo-frame__sprig--r" aria-hidden="true">
            <Sprig />
          </span>
        </>
      )}
      <div className="photo-frame__ring">
        <img className="photo-frame__img" src={src} alt="" loading="lazy" />
      </div>
    </div>
  );
}

function Sprig() {
  return (
    <svg viewBox="0 0 64 44" fill="none" aria-hidden="true">
      <g stroke="#B08A50" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M58 26 C 46 22 34 24 24 30" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={leafPath(52 - i * 6.5, 25 - i * 0.6, -152, 6, 0.52)} />
        ))}
      </g>
    </svg>
  );
}
