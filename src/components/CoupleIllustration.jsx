/* A quiet back-view illustration of the couple — the groom in a navy suit and
   the bride in a flowing ivory gown, hand in hand. Kept as soft flat shapes so
   it reads as fine stationery art, not clip-art. Pure SVG, no animation lib. */

export default function CoupleIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 260 320" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ci-gown" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f7f5f0" />
          <stop offset="1" stopColor="#e9e5db" />
        </linearGradient>
        <linearGradient id="ci-suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a4c65" />
          <stop offset="1" stopColor="#26344a" />
        </linearGradient>
      </defs>

      {/* soft shadow pooled on the ground */}
      <ellipse cx="132" cy="305" rx="82" ry="9" fill="#3a5a7c" fillOpacity="0.1" />

      {/* ---------- groom (left) ---------- */}
      <g>
        {/* trousers */}
        <path d="M97 180 L92 300 L106 300 L110 210 L114 300 L128 300 L123 180 Z" fill="#25334a" />
        {/* shoes */}
        <path d="M88 299 C88 295 96 293 107 296 L107 303 L88 303 Z" fill="#1b2536" />
        <path d="M113 299 C113 295 121 293 132 296 L132 303 L113 303 Z" fill="#1b2536" />
        {/* jacket */}
        <path
          d="M91 98 C91 84 99 74 110 74 C121 74 129 84 129 98 L133 170 C133 184 122 192 110 192 C98 192 87 184 87 170 Z"
          fill="url(#ci-suit)"
        />
        {/* centre seam + back vent */}
        <path d="M110 80 V190 M110 162 L105 190 M110 162 L115 190" stroke="#1f2b3e" strokeWidth="1" />
        {/* collar */}
        <path d="M101 80 L110 90 L119 80 C116 76 104 76 101 80 Z" fill="#45597a" />
        {/* neck + head + hair */}
        <rect x="106" y="63" width="8" height="13" rx="3" fill="#e3b78f" />
        <circle cx="110" cy="55" r="10.5" fill="#e7bd97" />
        <path d="M99 57 C99 43 104 35 110 35 C116 35 121 43 121 57 C121 50 116 45 110 45 C104 45 99 50 99 57 Z" fill="#2b2a2f" />
        {/* inner (right) arm to the joined hands */}
        <path d="M124 130 C129 138 132 146 133 154 C130 156 127 154 125 150 C122 143 121 137 120 131 Z" fill="#e3b78f" />
      </g>

      {/* ---------- bride (right) ---------- */}
      <g>
        {/* soft train pooling to the side */}
        <path
          d="M188 244 C208 256 220 276 213 296 C229 289 234 264 221 242 C211 232 196 234 188 244 Z"
          fill="url(#ci-gown)"
          stroke="#e2ddd1"
          strokeWidth="0.7"
        />
        {/* full skirt */}
        <path
          d="M151 120
             C140 120 134 143 129 180
             C123 224 111 264 99 298
             C134 306 184 306 217 292
             C205 246 191 194 180 150
             C174 128 165 120 151 120 Z"
          fill="url(#ci-gown)"
          stroke="#e2ddd1"
          strokeWidth="0.8"
        />
        {/* skirt fold shadows */}
        <path
          d="M150 130 C144 178 140 240 143 300 M165 138 C171 186 178 240 183 286 M135 144 C126 186 118 240 111 292"
          stroke="#ddd8cb"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* bodice */}
        <path
          d="M139 104 C139 94 146 88 152 88 C160 88 167 96 167 106 L170 150 C160 158 146 158 137 150 Z"
          fill="url(#ci-gown)"
          stroke="#e2ddd1"
          strokeWidth="0.8"
        />
        {/* bare shoulders / upper back */}
        <path d="M141 90 C145 82 160 82 165 90 C166 98 160 102 153 102 C147 102 141 98 141 90 Z" fill="#ecccaa" />
        {/* neck + head */}
        <rect x="149" y="70" width="8" height="12" rx="3" fill="#ecccaa" />
        <circle cx="153" cy="62" r="11" fill="#efd0ae" />
        {/* long wavy hair down the back */}
        <path
          d="M142 56 C137 49 139 37 150 33 C162 29 176 36 176 52 C177 66 171 76 169 90
             C173 110 172 134 163 152 C160 136 157 150 150 152
             C143 150 141 130 143 104 C138 84 138 68 142 56 Z"
          fill="#6c4b31"
        />
        <path d="M147 58 C144 84 145 122 151 150 M162 64 C165 92 164 126 158 150" stroke="#5a3d26" strokeWidth="1" strokeLinecap="round" />
        {/* inner (left) arm to the joined hands */}
        <path d="M142 120 C137 130 134 142 133 153 C136 155 139 153 141 148 C144 138 146 128 148 122 Z" fill="#ecccaa" />
        {/* a small blue posy at her far side */}
        <g>
          <circle cx="176" cy="150" r="4.6" fill="#9cb9d8" />
          <circle cx="182" cy="146" r="3.6" fill="#bcd0e5" />
          <circle cx="180" cy="155" r="3.2" fill="#8aa9cc" />
          <path d="M179 154 C181 166 180 178 177 189" stroke="#8fae7e" strokeWidth="1.1" strokeLinecap="round" />
        </g>
      </g>

      {/* joined hands */}
      <circle cx="132" cy="153" r="4" fill="#e7c19e" />
    </svg>
  );
}
