import { useReducedMotion } from 'framer-motion';
import useInViewport from '../hooks/useInViewport.js';
import { leafPath } from './decor.jsx';

/* A framed watercolor botanical illustration — an arched "window" of soft
   blooms, eucalyptus and gold sprigs. The gold frame draws itself in and the
   petals fade up when the vignette scrolls into view. Pure CSS motion. */

/* One open rose — concentric petal rings in a single hue, darker toward the
   centre, with a faint outline so it reads as a flower, not a smudge. */
function rose(cx, cy, r, hue, outline, keyBase) {
  const rings = [
    { count: 7, rad: r, scale: 1, op: 0.32 },
    { count: 6, rad: r * 0.66, scale: 0.82, op: 0.44 },
    { count: 5, rad: r * 0.36, scale: 0.64, op: 0.58 },
  ];
  const petals = [];
  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.count; i++) {
      const ang = (i / ring.count) * 360 + ri * 22;
      const rad = (ang * Math.PI) / 180;
      const px = cx + Math.cos(rad) * ring.rad * 0.46;
      const py = cy + Math.sin(rad) * ring.rad * 0.46;
      petals.push(
        <ellipse
          key={`${keyBase}-${ri}-${i}`}
          cx={px}
          cy={py}
          rx={r * 0.46 * ring.scale}
          ry={r * 0.3 * ring.scale}
          transform={`rotate(${ang} ${px} ${py})`}
          fill={hue}
          fillOpacity={ring.op}
          stroke={ri === 0 ? outline : 'none'}
          strokeWidth={ri === 0 ? 0.5 : 0}
          strokeOpacity="0.4"
        />
      );
    }
  });
  return (
    <g key={keyBase}>
      {petals}
      <circle cx={cx} cy={cy} r={Math.max(1.6, r * 0.12)} fill="#B08A50" fillOpacity="0.55" />
    </g>
  );
}

function euc(x, y, angle, length, tone, keyBase) {
  const rad = (angle * Math.PI) / 180;
  const ex = x + Math.cos(rad) * length;
  const ey = y + Math.sin(rad) * length;
  const n = Math.round(length / 15);
  const leaves = [];
  for (let i = 1; i <= n; i++) {
    const tt = i / (n + 1);
    const lx = x + Math.cos(rad) * length * tt;
    const ly = y + Math.sin(rad) * length * tt;
    const side = i % 2 ? 58 : -58;
    leaves.push(
      <ellipse
        key={`${keyBase}-${i}`}
        cx={lx}
        cy={ly}
        rx="5"
        ry="3"
        fill={tone}
        fillOpacity="0.4"
        transform={`rotate(${angle + side} ${lx} ${ly})`}
      />
    );
  }
  return (
    <g key={keyBase}>
      <path d={`M${x} ${y} L ${ex.toFixed(1)} ${ey.toFixed(1)}`} stroke="#7C9BB8" strokeOpacity="0.3" strokeWidth="0.9" />
      {leaves}
    </g>
  );
}

export default function FloralVignette({ className = '', id = 'fv', flip = false }) {
  const reduce = useReducedMotion();
  const [ref, active] = useInViewport();
  const on = active || reduce;

  const wash = `${id}-w`;
  const clip = `${id}-clip`;
  const arch = 'M24 292 V118 C24 56 74 14 130 14 C186 14 236 56 236 118 V292';

  return (
    <svg
      ref={ref}
      viewBox="0 0 260 306"
      className={`floral-vignette ${on ? 'floral-vignette--in' : ''} ${className}`}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <radialGradient id={wash} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#EBE3D8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#EBE3D8" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <path d={`${arch} V292 H24 Z`} />
        </clipPath>
      </defs>

      {/* the botanical scene, clipped to the arch */}
      <g clipPath={`url(#${clip})`} className="floral-vignette__scene">
        <rect x="24" y="14" width="212" height="278" fill="#fdfbf6" />

        {/* faint neutral halo behind the arrangement */}
        <ellipse cx="130" cy="150" rx="86" ry="88" fill={`url(#${wash})`} />

        {/* eucalyptus fanning from the base — behind the blooms */}
        {euc(130, 232, -150, 118, '#8FA9C6', 'e1')}
        {euc(136, 230, -104, 108, '#9CB6D4', 'e2')}
        {euc(142, 234, -54, 116, '#8FA9C6', 'e3')}
        {euc(128, 234, -196, 92, '#A7C0D8', 'e4')}

        {/* gold sprigs */}
        <g stroke="#B08A50" strokeOpacity="0.62" strokeWidth="0.9" fill="none" strokeLinecap="round">
          <path d="M144 230 C 180 206 218 206 250 222" />
          {[186, 206, 226].map((gx, i) => (
            <path key={i} d={leafPath(gx, 206 + i * 3 + (gx - 186) * 0.08, -42, 10, 0.34)} />
          ))}
          <path d="M118 232 C 90 208 58 206 28 220" />
          {[100, 82].map((gx, i) => (
            <path key={`l${i}`} d={leafPath(gx, 210 + i * 3, -138, 9, 0.34)} />
          ))}
        </g>

        {/* the blooms — one blush, one blue, one small blush; barely overlapping */}
        {rose(102, 150, 34, '#D9A9AE', '#B26B75', 'r1')}
        {rose(162, 168, 30, '#9FBAD8', '#5E7DA0', 'r2')}
        {rose(134, 108, 22, '#D9A9AE', '#B26B75', 'r3')}

        {/* a couple of buds */}
        {rose(118, 206, 12, '#9FBAD8', '#5E7DA0', 'b1')}
        {rose(178, 200, 11, '#D9A9AE', '#B26B75', 'b2')}

        {/* gilded berries */}
        <g fill="#B08A50" fillOpacity="0.5">
          <circle cx="196" cy="146" r="2.8" />
          <circle cx="203" cy="153" r="2.2" />
          <circle cx="189" cy="155" r="1.9" />
        </g>
      </g>

      {/* the frame */}
      <path
        className="floral-vignette__frame"
        pathLength="1"
        d={arch}
        stroke="#B08A50"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M18 296 V116 C18 50 68 6 130 6 C192 6 242 50 242 116 V296"
        stroke="#B08A50"
        strokeOpacity="0.4"
        strokeWidth="0.7"
      />
      {/* apex diamond */}
      <path className="floral-vignette__gem" d="M130 2 l6 8 -6 8 -6 -8 Z" fill="#B08A50" fillOpacity="0.8" />
    </svg>
  );
}
