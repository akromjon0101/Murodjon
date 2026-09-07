/* Delicate inline SVG artwork — botanical linework, a monogram crest, arched
   frames, butterflies and thin line icons. Everything is stroked in
   `currentColor` so it reads as fine engraving rather than clip-art.
   Inspired by fine-art / editorial wedding stationery.
   No animation library here — motion is done with CSS. */

/* ---------- shared shape helpers (all in local SVG units) ---------- */

// An almond leaf from (x,y), pointing at `angle` degrees, of length `len`.
export function leafPath(x, y, angle, len, curve = 0.3) {
  const rad = (angle * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const px = -uy;
  const py = ux;
  const tipX = x + ux * len;
  const tipY = y + uy * len;
  const w = len * curve;
  const c1x = x + ux * len * 0.4 + px * w;
  const c1y = y + uy * len * 0.4 + py * w;
  const c2x = x + ux * len * 0.6 + px * w;
  const c2y = y + uy * len * 0.6 + py * w;
  const c3x = x + ux * len * 0.6 - px * w;
  const c3y = y + uy * len * 0.6 - py * w;
  const c4x = x + ux * len * 0.4 - px * w;
  const c4y = y + uy * len * 0.4 - py * w;
  return `M${x.toFixed(1)} ${y.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} C${c3x.toFixed(1)} ${c3y.toFixed(1)} ${c4x.toFixed(1)} ${c4y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}Z`;
}

function Blossom({ cx, cy, r = 5, stroke, petals = 5 }) {
  return (
    <g>
      {[...Array(petals)].map((_, i) => {
        const a = (i / petals) * 360 - 90;
        return <path key={i} d={leafPath(cx, cy, a, r * 1.7, 0.55)} stroke={stroke} strokeWidth="0.9" strokeLinejoin="round" />;
      })}
      <circle cx={cx} cy={cy} r={r * 0.32} fill={stroke} />
    </g>
  );
}

/* ---------- botanical ---------- */

export function OliveBranch({ className = '', stroke = 'currentColor' }) {
  const leaves = [];
  for (let i = 0; i < 4; i++) {
    const x = 34 + i * 40;
    const y = 30 - i * 4;
    leaves.push(leafPath(x, y, -145, 20, 0.34));
    leaves.push(leafPath(x + 14, y + 4, -35, 20, 0.34));
  }
  return (
    <svg viewBox="0 0 200 60" className={className} fill="none" aria-hidden="true">
      <path d="M6 36C50 36 110 26 176 6c8-2 14-3 18-3" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      {leaves.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth="0.9" strokeLinejoin="round" />
      ))}
      <ellipse cx="184" cy="3" rx="4" ry="6" stroke={stroke} strokeWidth="0.9" transform="rotate(-30 184 3)" />
    </svg>
  );
}

export function Wildflower({ className = '', stroke = 'currentColor' }) {
  return (
    <svg viewBox="0 0 60 90" className={className} fill="none" aria-hidden="true">
      <path d="M30 88C30 62 27 44 30 24" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M30 60c-9-1-15-7-17-16M30 48c9 0 16-5 19-14M30 38c-8 0-13-5-15-13" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
      <path d={leafPath(14, 45, 200, 12, 0.35)} stroke={stroke} strokeWidth="0.9" />
      <path d={leafPath(48, 35, -20, 12, 0.35)} stroke={stroke} strokeWidth="0.9" />
      <Blossom cx={30} cy={16} r={6} stroke={stroke} />
    </svg>
  );
}

/* Symmetric horizontal ornament with a small central bloom. */
export function FloralDivider({ className = '', stroke = 'currentColor' }) {
  const Half = ({ flip }) => (
    <g transform={flip ? 'translate(200,0) scale(-1,1)' : undefined}>
      <path d="M108 20 C 82 20 60 20 30 20" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d={leafPath(84, 20, 210, 11, 0.4)} stroke={stroke} strokeWidth="0.85" />
      <path d={leafPath(66, 20, 150, 11, 0.4)} stroke={stroke} strokeWidth="0.85" />
      <path d={leafPath(48, 20, 210, 9, 0.4)} stroke={stroke} strokeWidth="0.85" />
      <circle cx="30" cy="20" r="1.5" fill={stroke} />
    </g>
  );
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" aria-hidden="true">
      <Half />
      <Half flip />
      <Blossom cx={100} cy={20} r={5} stroke={stroke} />
    </svg>
  );
}

/* Detailed corner spray — mirror with -scale-x / -scale-y for other corners. */
export function CornerFloral({ className = '', stroke = 'currentColor' }) {
  const leaves = [];
  for (let i = 0; i < 6; i++) {
    const t = i / 6;
    // stem runs from (10,10) curving down-right
    const sx = 10 + t * 120 + Math.sin(t * 3) * 4;
    const sy = 10 + t * t * 150;
    leaves.push(leafPath(sx, sy, 20 + t * 40, 16 - t * 3, 0.34));
    leaves.push(leafPath(sx, sy, 150 - t * 30, 16 - t * 3, 0.34));
  }
  return (
    <svg viewBox="0 0 170 190" className={className} fill="none" aria-hidden="true">
      <path d="M10 10 C 40 30 70 55 92 95 C 110 128 120 158 122 186" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      {leaves.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth="0.85" strokeLinejoin="round" />
      ))}
      <Blossom cx={18} cy={16} r={6} stroke={stroke} />
      <Blossom cx={70} cy={62} r={5} stroke={stroke} />
      <Blossom cx={108} cy={132} r={4.5} stroke={stroke} />
    </svg>
  );
}

/* Slim arched frame — sits absolutely inside a relative parent. */
export function ArchOutline({ className = '', stroke = 'currentColor' }) {
  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="none" className={className} fill="none" aria-hidden="true">
      <path d="M12 388 V150 C12 74 74 12 150 12 C226 12 288 74 288 150 V388" stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

/* Monogram crest — two initials, ampersand, framed by a laurel ring. */
export function Monogram({ a = 'A', b = 'B', className = '', stroke = 'currentColor' }) {
  const laurel = [];
  const arcs = [
    [140, 250],
    [-70, 40],
  ];
  arcs.forEach(([start, end], k) => {
    const steps = 7;
    for (let i = 0; i < steps; i++) {
      const ang = start + ((end - start) * i) / (steps - 1);
      const rad = (ang * Math.PI) / 180;
      const x = 60 + Math.cos(rad) * 46;
      const y = 60 + Math.sin(rad) * 46;
      laurel.push(leafPath(x, y, ang + 90 + (k === 0 ? 18 : -18), 8, 0.4));
      laurel.push(leafPath(x, y, ang + 90 - (k === 0 ? 18 : -18), 8, 0.4));
    }
  });
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="40" stroke={stroke} strokeWidth="0.9" />
      {laurel.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth="0.8" strokeLinejoin="round" />
      ))}
      <text x="43" y="70" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="30" fill={stroke}>
        {a}
      </text>
      <text x="60" y="67" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="17" fill={stroke}>
        &amp;
      </text>
      <text x="77" y="70" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="30" fill={stroke}>
        {b}
      </text>
    </svg>
  );
}

/* Gold monogram wreath — a fine broken gold ring with a few leaf sprigs and
   the two initials in navy script at the centre. */
export function GoldMonogram({ a = 'A', b = 'B', className = '' }) {
  const sprig = (cx, cy, rot) => (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <path d={`M${cx} ${cy} q 10 -3 20 -1`} stroke="#B08A50" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={leafPath(cx + 4 + i * 5, cy - 1 - i * 0.6, -34, 6, 0.5)}
          stroke="#B08A50"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      {/* broken gold ring — two arcs */}
      <path d="M60 16 A44 44 0 0 1 104 60" stroke="#B08A50" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M60 104 A44 44 0 0 1 16 60" stroke="#B08A50" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M104 60 A44 44 0 0 1 88 94" stroke="#B08A50" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1 4" />
      <path d="M16 60 A44 44 0 0 1 32 26" stroke="#B08A50" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1 4" />

      {sprig(30, 26, -18)}
      {sprig(90, 94, 162)}

      {/* initials */}
      <text
        x="44"
        y="72"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="42"
        fill="#3A5A7C"
      >
        {a}
      </text>
      <text
        x="62"
        y="66"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="16"
        fill="#B08A50"
      >
        &amp;
      </text>
      <text
        x="80"
        y="80"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="42"
        fill="#3A5A7C"
      >
        {b}
      </text>
    </svg>
  );
}

/* Small diamond — the recurring accent (replaces the old sparkle). */
export function Sparkle({ className = '', fill = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1 L21 12 L12 23 L3 12 Z" fill="none" stroke={fill} strokeWidth="1.4" />
      <path d="M12 6 L16 12 L12 18 L8 12 Z" fill={fill} />
    </svg>
  );
}

/* Thin gold rule with a centred diamond. */
export function SparkleRule({ className = '', width = 'w-40' }) {
  return (
    <div className={`gold-rule ${className}`} aria-hidden="true">
      <span className={`h-px ${width} max-w-[34vw] bg-current opacity-60`} />
      <Sparkle className="h-2.5 w-2.5 shrink-0" />
      <span className={`h-px ${width} max-w-[34vw] bg-current opacity-60`} />
    </div>
  );
}
export { SparkleRule as GoldRule };

/* Watercolor-style floral cluster for a corner. Layered translucent blooms in
   dusty blue + blush with fine gold leaf lines. Mirror with -scale-x/-scale-y. */
export function WatercolorCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 220 220" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="wcBlue" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#9DB8D6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9DB8D6" stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id="wcBlush" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#E6BEC2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#E6BEC2" stopOpacity="0.12" />
        </radialGradient>
        <radialGradient id="wcNavy" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#5E7DA0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5E7DA0" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* soft leaf washes */}
      <path d="M-10 60 C 30 40 70 55 92 96 C 60 104 20 96 -10 60Z" fill="url(#wcNavy)" />
      <path d="M60 -10 C 44 26 56 66 96 92 C 104 58 96 20 60 -10Z" fill="url(#wcNavy)" />

      {/* blooms */}
      <g>
        <circle cx="34" cy="34" r="34" fill="url(#wcBlue)" />
        <circle cx="78" cy="20" r="20" fill="url(#wcBlush)" />
        <circle cx="18" cy="82" r="22" fill="url(#wcBlush)" />
        <circle cx="70" cy="66" r="18" fill="url(#wcBlue)" />
        <circle cx="104" cy="46" r="14" fill="url(#wcNavy)" />
      </g>

      {/* rose spiral line detail */}
      <g stroke="#3A5A7C" strokeOpacity="0.5" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M34 34c-7-1-11 4-9 10 3 8 15 8 19-1 4-11-6-21-18-19-13 2-20 16-13 28" />
        <path d="M18 82c4-6 12-6 15 0M70 66c-5-3-11-1-13 4" />
      </g>

      {/* gold leaf sprigs */}
      <g stroke="#B08A50" strokeWidth="1.1" fill="none" strokeLinecap="round">
        <path d="M96 92 C 120 84 150 92 176 118" />
        {[104, 122, 140, 158].map((x, i) => (
          <path
            key={i}
            d={leafPath(x, 92 + i * 6.5 + (x - 104) * 0.15, -40, 13, 0.34)}
          />
        ))}
        <path d="M92 96 C 84 120 92 150 118 176" />
        {[92, 98, 104, 112].map((y, i) => (
          <path key={`b${i}`} d={leafPath(88 + i * 5, y + i * 12, -130, 12, 0.34)} />
        ))}
      </g>
    </svg>
  );
}

/* Elegant flowing watercolor branch — dusty-blue leaves, a few soft blush
   roses, fine gold sprigs. A single graceful signature element (not a corner
   cluster). `id` must be unique per instance for the gradients. */
export function WatercolorSpray({ className = '', id = 'ws', flip = false }) {
  const B = `${id}-b`;
  const R = `${id}-r`;
  return (
    <svg
      viewBox="0 0 320 260"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <radialGradient id={B} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#A9C0DA" stopOpacity="0.75" />
          <stop offset="1" stopColor="#A9C0DA" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={R} cx="0.42" cy="0.4" r="0.72">
          <stop offset="0" stopColor="#E6C3C6" stopOpacity="0.8" />
          <stop offset="1" stopColor="#E6C3C6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft painterly washes under the linework */}
      <ellipse cx="90" cy="70" rx="58" ry="46" fill={`url(#${B})`} />
      <ellipse cx="176" cy="120" rx="46" ry="40" fill={`url(#${R})`} />
      <ellipse cx="52" cy="150" rx="40" ry="34" fill={`url(#${R})`} />
      <ellipse cx="230" cy="66" rx="44" ry="36" fill={`url(#${B})`} />

      {/* main stem */}
      <path
        d="M20 240 C 60 200 70 150 96 96 C 118 52 168 34 250 20"
        stroke="#3A5A7C"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* leaves along the stem */}
      <g stroke="#5E7DA0" strokeOpacity="0.5" strokeWidth="1" strokeLinejoin="round">
        {[
          [44, 196, 152, 26],
          [66, 152, 206, 26],
          [86, 110, 150, 24],
          [116, 66, 202, 22],
          [156, 46, 150, 20],
          [206, 34, 202, 20],
        ].map(([x, y, a, l], i) => (
          <path key={i} d={leafPath(x, y, a, l, 0.44)} />
        ))}
      </g>

      {/* open roses — clean layered petals */}
      {[
        [92, 74, 20],
        [176, 118, 16],
        [52, 150, 14],
      ].map(([cx, cy, r], i) => (
        <g key={i} stroke="#3A5A7C" strokeOpacity="0.4" strokeWidth="1" fill="none" strokeLinejoin="round">
          {[0, 1, 2, 3, 4].map((p) => {
            const ang = (p / 5) * 360 - 90;
            return <path key={`o${p}`} d={leafPath(cx, cy, ang, r, 0.62)} />;
          })}
          {[0, 1, 2, 3, 4].map((p) => {
            const ang = (p / 5) * 360 - 54;
            return <path key={`m${p}`} d={leafPath(cx, cy, ang, r * 0.6, 0.62)} />;
          })}
          <circle cx={cx} cy={cy} r={r * 0.16} fill="#3A5A7C" fillOpacity="0.35" />
        </g>
      ))}

      {/* fine gold accent sprigs */}
      <g stroke="#B08A50" strokeOpacity="0.7" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M250 20 C 268 24 284 36 296 58" />
        {[258, 270, 282].map((x, i) => (
          <path key={i} d={leafPath(x, 22 + i * 10 + (x - 258) * 0.2, -46, 12, 0.36)} />
        ))}
        <path d="M20 240 C 34 234 46 236 58 246" />
      </g>
    </svg>
  );
}

/* ---- richer watercolor bouquet (fine-art wedding style) ---- */

function wcRose(cx, cy, r, main, soft) {
  // a loose open spiral (garden-rose seen from above)
  const turns = 2.4;
  const steps = 40;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * Math.PI * 2 + 0.6;
    const rad = t * r * 0.92;
    const x = (cx + Math.cos(ang) * rad).toFixed(1);
    const y = (cy + Math.sin(ang) * rad).toFixed(1);
    d += i === 0 ? `M${x} ${y}` : ` L${x} ${y}`;
  }
  // a few outer petal loops
  const petals = [];
  for (let p = 0; p < 5; p++) {
    const a = (p / 5) * Math.PI * 2 + 0.3;
    const x0 = cx + Math.cos(a) * r * 0.62;
    const y0 = cy + Math.sin(a) * r * 0.62;
    const x1 = cx + Math.cos(a + 1.15) * r * 0.62;
    const y1 = cy + Math.sin(a + 1.15) * r * 0.62;
    const mx = cx + Math.cos(a + 0.57) * r * 1.12;
    const my = cy + Math.sin(a + 0.57) * r * 1.12;
    petals.push(
      `M${x0.toFixed(1)} ${y0.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`
    );
  }
  return (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={r * 1.05} fill={soft} />
      <g stroke={main} strokeWidth={r * 0.075} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
        <path d={d} />
        {petals.map((pp, i) => (
          <path key={i} d={pp} />
        ))}
      </g>
    </g>
  );
}

function wcEuc(x, y, angle, length, tone) {
  const rad = (angle * Math.PI) / 180;
  const ex = x + Math.cos(rad) * length;
  const ey = y + Math.sin(rad) * length;
  const leaves = [];
  const n = Math.round(length / 14);
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const lx = x + Math.cos(rad) * length * t;
    const ly = y + Math.sin(rad) * length * t;
    const side = i % 2 ? 62 : -62;
    leaves.push(
      <ellipse key={i} cx={lx} cy={ly} rx="6.5" ry="4" fill={tone} transform={`rotate(${angle + side} ${lx} ${ly})`} />
    );
  }
  return (
    <g key={`${x}-${y}-${angle}`}>
      <path d={`M${x} ${y} L ${ex.toFixed(1)} ${ey.toFixed(1)}`} stroke="#5E7DA0" strokeOpacity="0.4" strokeWidth="1" />
      {leaves}
    </g>
  );
}

/* A fuller watercolor arrangement — roses, eucalyptus, gold sprigs.
   `id` must be unique per instance. */
export function WatercolorBouquet({ className = '', id = 'wb', flip = false }) {
  const A = `${id}-a`;
  const B = `${id}-c`;
  return (
    <svg
      viewBox="0 0 360 300"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <radialGradient id={A} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#AEC4DC" stopOpacity="0.6" />
          <stop offset="1" stopColor="#AEC4DC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={B} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#E7C6C9" stopOpacity="0.62" />
          <stop offset="1" stopColor="#E7C6C9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* painterly base washes */}
      <ellipse cx="120" cy="120" rx="96" ry="80" fill={`url(#${A})`} />
      <ellipse cx="220" cy="150" rx="88" ry="76" fill={`url(#${B})`} />
      <ellipse cx="180" cy="80" rx="70" ry="56" fill={`url(#${B})`} />

      {/* eucalyptus fanning out */}
      {wcEuc(160, 170, -150, 130, '#9CB6D4')}
      {wcEuc(170, 168, -110, 120, '#A7C0D8')}
      {wcEuc(180, 172, -60, 128, '#9CB6D4')}
      {wcEuc(176, 176, -20, 110, '#A7C0D8')}
      {wcEuc(150, 176, -200, 96, '#B7C9DE')}

      {/* gold accent sprigs */}
      <g stroke="#B08A50" strokeOpacity="0.75" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M182 176 C 220 150 268 150 312 172" />
        {[228, 250, 272, 292].map((gx, i) => (
          <path key={i} d={leafPath(gx, 152 + i * 4 + (gx - 228) * 0.12, -42, 12, 0.34)} />
        ))}
        <path d="M160 178 C 130 150 96 148 60 164" />
        {[136, 116, 96].map((gx, i) => (
          <path key={`l${i}`} d={leafPath(gx, 156 + i * 3, -138, 11, 0.34)} />
        ))}
      </g>

      {/* the roses */}
      {wcRose(126, 128, 40, '#3A5A7C', `url(#${A})`)}
      {wcRose(214, 150, 34, '#B26B75', `url(#${B})`)}
      {wcRose(176, 92, 28, '#3A5A7C', `url(#${A})`)}
      {wcRose(158, 178, 20, '#B26B75', `url(#${B})`)}

      {/* berries */}
      <g fill="#5E7DA0" fillOpacity="0.55">
        <circle cx="252" cy="120" r="4" />
        <circle cx="262" cy="128" r="3.4" />
        <circle cx="246" cy="130" r="3" />
      </g>
    </svg>
  );
}

/* ---- gilded watercolor bloom (soft washes, no scribbly linework) ---- */

/* One abstract rose built from translucent petal ellipses spiralling inward. */
function softRose(cx, cy, r, a, b) {
  const petals = [];
  const rings = [
    { count: 6, rad: r, scale: 1, tone: b },
    { count: 5, rad: r * 0.66, scale: 0.8, tone: a },
    { count: 4, rad: r * 0.36, scale: 0.62, tone: b },
  ];
  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.count; i++) {
      const ang = (i / ring.count) * 360 + ri * 24;
      const rad = (ang * Math.PI) / 180;
      const px = cx + Math.cos(rad) * ring.rad * 0.5;
      const py = cy + Math.sin(rad) * ring.rad * 0.5;
      petals.push(
        <ellipse
          key={`${ri}-${i}`}
          cx={px}
          cy={py}
          rx={r * 0.5 * ring.scale}
          ry={r * 0.34 * ring.scale}
          fill={ring.tone}
          transform={`rotate(${ang} ${px} ${py})`}
        />
      );
    }
  });
  return (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={r * 1.15} fill={a} />
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.14} fill="#B08A50" fillOpacity="0.5" />
    </g>
  );
}

/* A fine-art watercolor arrangement — soft blooms, leaf washes, gold sprigs and
   a few gilded dots. Painterly, no visible pen-strokes. `id` unique per use. */
export function GildedBloom({ className = '', id = 'gb', flip = false }) {
  const blue = `${id}-b`;
  const blush = `${id}-r`;
  const leaf = `${id}-l`;
  return (
    <svg
      viewBox="0 0 340 300"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <radialGradient id={blue} cx="0.42" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#9FBAD8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#9FBAD8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={blush} cx="0.42" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#E4BEC3" stopOpacity="0.6" />
          <stop offset="1" stopColor="#E4BEC3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={leaf} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8FA9C6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#B8C9DE" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* painterly base washes */}
      <ellipse cx="120" cy="128" rx="104" ry="88" fill={`url(#${blue})`} />
      <ellipse cx="214" cy="150" rx="92" ry="80" fill={`url(#${blush})`} />
      <ellipse cx="176" cy="86" rx="74" ry="60" fill={`url(#${blush})`} />

      {/* leaf washes */}
      <g fill={`url(#${leaf})`}>
        <path d="M150 176 C 96 172 52 150 24 108 C 70 96 122 112 150 176 Z" />
        <path d="M176 176 C 220 150 268 150 320 168 C 280 196 224 196 176 176 Z" />
        <path d="M164 172 C 150 128 152 78 172 32 C 200 74 196 132 164 172 Z" />
      </g>

      {/* gold accent sprigs */}
      <g stroke="#B08A50" strokeOpacity="0.7" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M182 176 C 224 150 272 150 316 170" />
        {[230, 252, 274, 294].map((gx, i) => (
          <path key={i} d={leafPath(gx, 150 + i * 4 + (gx - 230) * 0.12, -42, 12, 0.34)} />
        ))}
        <path d="M158 178 C 128 150 96 148 58 162" />
        {[134, 114, 94].map((gx, i) => (
          <path key={`l${i}`} d={leafPath(gx, 156 + i * 3, -138, 11, 0.34)} />
        ))}
      </g>

      {/* the blooms */}
      {softRose(128, 130, 40, `url(#${blue})`, `url(#${blush})`)}
      {softRose(214, 152, 32, `url(#${blush})`, `url(#${blue})`)}
      {softRose(176, 90, 26, `url(#${blue})`, `url(#${blush})`)}
      {softRose(158, 180, 18, `url(#${blush})`, `url(#${blue})`)}

      {/* gilded berries + dots */}
      <g fill="#B08A50" fillOpacity="0.55">
        <circle cx="252" cy="118" r="3.6" />
        <circle cx="262" cy="126" r="3" />
        <circle cx="244" cy="128" r="2.6" />
        <circle cx="96" cy="150" r="2.6" />
        <circle cx="104" cy="160" r="2.2" />
      </g>
    </svg>
  );
}

/* A single delicate eucalyptus sprig for section accents. */
export function EucalyptusSprig({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 200 90"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M6 78 C 50 66 110 50 194 14" stroke="#5E7DA0" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
      {[...Array(9)].map((_, i) => {
        const t = i / 9;
        const x = 12 + t * 172;
        const y = 74 - t * 58;
        const side = i % 2 ? 58 : -58;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="7"
            ry="4.2"
            fill="#9CB6D4"
            fillOpacity="0.55"
            transform={`rotate(${-18 + side} ${x} ${y})`}
          />
        );
      })}
      <g fill="#B08A50" fillOpacity="0.6">
        <circle cx="188" cy="16" r="2.6" />
        <circle cx="180" cy="22" r="2.2" />
      </g>
    </svg>
  );
}

/* Thin gold art-deco corner flourish (mirror with -scale-x/-scale-y). */
export function GoldDecoCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g stroke="#B08A50" strokeWidth="1.1" strokeLinecap="round" fill="none">
        <path d="M8 8 H86 M8 8 V86" />
        <path d="M20 20 H70 M20 20 V70" />
        <path d="M86 8 q 14 0 14 14 q 0 10 -8 10 q -6 0 -6 -6 q 0 -4 4 -4" />
        <path d="M8 86 q 0 14 14 14 q 10 0 10 -8 q 0 -6 -6 -6 q -4 0 -4 4" />
        <path d="M70 20 q 10 0 10 10" />
        <path d="M20 70 q 0 10 10 10" />
      </g>
    </svg>
  );
}

export function Butterfly({ className = '', stroke = 'currentColor' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 20c0-6-6-12-14-12-6 0-10 5-10 11 0 9 10 15 24 17M32 20c0-6 6-12 14-12 6 0 10 5 10 11 0 9-10 15-24 17M32 20v28M32 48c-8 4-16 5-20 2-3-2-4-6-2-9 3-5 12-6 22-3M32 48c8 4 16 5 20 2 3-2 4-6 2-9-3-5-12-6-22-3"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 16c1.5-3 3-5 3-8M32 16c-1.5-3-3-5-3-8" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* Butterfly with slowly flapping wings (CSS animation). */
export function FlutterButterfly({ className = '', stroke = 'currentColor', speed = 0.9 }) {
  const wing = (dir) => (
    <g
      className="decor-wing"
      style={{ transformOrigin: '32px 24px', animationDuration: `${speed * 2}s` }}
    >
      <path
        d={
          dir < 0
            ? 'M32 22c0-8-8-16-17-16-7 0-12 6-12 13 0 11 12 18 29 20'
            : 'M32 22c0-8 8-16 17-16 7 0 12 6 12 13 0 11-12 18-29 20'
        }
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d={
          dir < 0
            ? 'M32 26c-7 5-14 6-19 3-3-2-4-6-2-10 3-6 12-7 21-3'
            : 'M32 26c7 5 14 6 19 3 3-2 4-6 2-10-3-6-12-7-21-3'
        }
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </g>
  );
  return (
    <svg viewBox="0 0 64 56" className={className} fill="none" aria-hidden="true">
      {wing(-1)}
      {wing(1)}
      <path d="M32 22v22M32 18c1.4-3 2.6-4.6 2.6-7M32 18c-1.4-3-2.6-4.6-2.6-7" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* A trailing spray of leaves off a curved stem. `flip` mirrors it. */
export function LeafSpray({ className = '', stroke = 'currentColor', flip = false }) {
  const leaves = [];
  for (let i = 0; i < 6; i++) {
    const t = i / 5;
    const x = 8 + t * 150;
    const y = 60 - Math.sin(t * Math.PI) * 34 - t * 6;
    leaves.push(leafPath(x, y, -50 - t * 12, 20 - t * 6, 0.4));
    leaves.push(leafPath(x, y, -150 + t * 14, 20 - t * 6, 0.4));
  }
  return (
    <svg
      viewBox="0 0 170 70"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M4 66 C 40 50 90 30 164 8" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      {leaves.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth="0.9" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/* Big arched vine of leaves framing the hero. The stroke draws itself in with
   a CSS stroke-dashoffset animation (no animation library). */
export function ArchVine({ className = '' }) {
  const leaves = [];
  const steps = 11;
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const ang = Math.PI * (1 - t);
    const x = 150 + Math.cos(ang) * 138;
    const y = 300 - Math.sin(ang) * 250;
    const outward = (ang * 180) / Math.PI;
    leaves.push(leafPath(x, y, outward + 90 + 22, 16, 0.4));
    leaves.push(leafPath(x, y, outward + 90 - 22, 16, 0.4));
  }
  return (
    <svg viewBox="0 0 300 320" className={className} fill="none" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <path
        className="archvine-stroke"
        d="M12 316 V150 C12 60 74 12 150 12 C226 12 288 60 288 150 V316"
        stroke="currentColor"
        strokeWidth="1"
      />
      {leaves.map((d, i) => (
        <path
          key={i}
          className="archvine-leaf"
          style={{ animationDelay: `${0.4 + i * 0.08}s` }}
          d={d}
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/* Clean thin arch outline (self-drawing stroke). Used to frame the hero
   without the visual noise of the leafy ArchVine. */
export function ArchLine({ className = '' }) {
  return (
    <svg
      viewBox="0 0 300 320"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      <path
        className="archvine-stroke"
        d="M14 320 V148 C14 62 76 14 150 14 C224 14 286 62 286 148 V320"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M8 320 V150 C8 58 72 8 150 8 C228 8 292 58 292 150 V320"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* backward-compat alias — a light horizontal sprig */
export function Sprig({ className = '', stroke = 'currentColor' }) {
  return <FloralDivider className={className} stroke={stroke} />;
}

export function Petal({ className = '', fill = '#E8E5DF' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1C7 6 3 11 3 16a9 9 0 0018 0c0-5-4-10-9-15Z" fill={fill} opacity="0.9" />
    </svg>
  );
}

export function Leaf({ className = '', stroke = '#9c9689', fill = '#E8E5DF' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M21 3C10 3 3 10 3 21c11 0 18-7 18-18Z" fill={fill} opacity="0.85" />
      <path d="M21 3C14 10 8 15 3 21" stroke={stroke} strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ---------- line icons ---------- */

export function IconCalendar({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLocation({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconVenue({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-5h6v5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function IconMusic({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M9 18V5l11-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  );
}

export function IconPause({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M9 5v14M15 5v14" strokeLinecap="round" />
    </svg>
  );
}
