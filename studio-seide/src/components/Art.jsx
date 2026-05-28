// Inline SVG artwork — no raster images, fully offline & crisp at any size.
// A small palette keyed by "tone" so plates/avatars feel like one editorial set.

const TONES = {
  copper: { a: '#c0703f', b: '#e7b489', ink: '#3a2113' },
  ink: { a: '#2a241d', b: '#6f675a', ink: '#f3efe6' },
  ash: { a: '#7d8a8c', b: '#bcc6c6', ink: '#22282a' },
  rouge: { a: '#b14b3c', b: '#e2a193', ink: '#3a1813' },
  olive: { a: '#7d7f57', b: '#c2c39b', ink: '#23240f' },
  sand: { a: '#c9a06a', b: '#ecd6b3', ink: '#3a2c14' },
}

const toneOf = (t) => TONES[t] || TONES.copper

// Abstract editorial "portrait" plate — a stylised head/hair silhouette
// over a two-tone field. Decorative only (aria-hidden in callers).
export function PlateArt({ tone = 'copper', seed = 0 }) {
  const c = toneOf(tone)
  const tilt = (seed % 2 === 0 ? 1 : -1) * (4 + (seed % 3) * 2)
  return (
    <svg viewBox="0 0 300 400" role="img" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="400" fill={c.b} />
      <g transform={`translate(150 230) rotate(${tilt})`}>
        {/* hair mass */}
        <path
          d="M0,-150 C70,-150 100,-95 100,-30 C100,40 70,95 40,120 L40,40 C40,10 30,-10 0,-10 C-30,-10 -40,10 -40,40 L-40,120 C-70,95 -100,40 -100,-30 C-100,-95 -70,-150 0,-150 Z"
          fill={c.a}
        />
        {/* face */}
        <ellipse cx="0" cy="-30" rx="42" ry="52" fill={c.b} />
        <path d="M-42,-30 a42,52 0 0 1 84,0 Z" fill={c.a} opacity="0.18" />
        {/* shoulders */}
        <path d="M-80,170 C-80,110 -40,80 0,80 C40,80 80,110 80,170 Z" fill={c.a} opacity="0.9" />
      </g>
    </svg>
  )
}

// Avatar tile for team members — abstract head + monogram.
export function AvatarArt({ tone = 'ink', initials = 'SS' }) {
  const c = toneOf(tone)
  return (
    <svg viewBox="0 0 320 240" className="avatar" role="img" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="240" fill={c.b} />
      <g transform="translate(160 150)">
        <path
          d="M0,-110 C55,-110 78,-72 78,-22 C78,28 55,70 0,70 C-55,70 -78,28 -78,-22 C-78,-72 -55,-110 0,-110 Z"
          fill={c.a}
        />
        <ellipse cx="0" cy="-22" rx="34" ry="42" fill={c.b} />
      </g>
      <text
        x="22"
        y="46"
        fill={c.ink}
        opacity="0.85"
        fontFamily="'Fraunces', Georgia, serif"
        fontSize="34"
        fontWeight="600"
      >
        {initials}
      </text>
    </svg>
  )
}

// Big hero illustration — comb + scissors arrangement, editorial line-art.
export function HeroArt() {
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="Illustration: Schere, Kamm und Haarsträhne" preserveAspectRatio="xMidYMid meet">
      <rect width="640" height="420" fill="#faf7f0" />
      {/* flowing hair strands */}
      <g fill="none" stroke="#b14b3c" strokeWidth="2.4" opacity="0.85">
        <path d="M70,40 C200,90 180,200 320,230 C460,260 470,360 600,380" />
        <path d="M40,90 C190,150 170,250 320,270 C470,290 480,380 610,400" opacity="0.5" />
        <path d="M100,30 C220,70 210,180 340,200 C470,220 500,330 600,350" opacity="0.35" />
      </g>
      {/* scissors */}
      <g transform="translate(420 90) rotate(18)" stroke="#17120d" strokeWidth="6" fill="none">
        <circle cx="0" cy="0" r="22" />
        <circle cx="0" cy="64" r="22" />
        <line x1="14" y1="16" x2="120" y2="78" strokeLinecap="round" />
        <line x1="14" y1="48" x2="120" y2="-14" strokeLinecap="round" />
        <circle cx="120" cy="32" r="4.5" fill="#17120d" />
      </g>
      {/* comb */}
      <g transform="translate(120 250) rotate(-12)" fill="#17120d">
        <rect x="0" y="0" width="180" height="20" rx="4" />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={6 + i * 12} y="20" width="5" height="34" rx="2" />
        ))}
      </g>
      <rect width="640" height="420" fill="none" />
    </svg>
  )
}

// Abstract neighbourhood map (decorative, not interactive map data).
export function MapArt() {
  return (
    <svg viewBox="0 0 480 260" role="img" aria-label="Stilisierte Karte des Schanzenviertels" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="260" fill="#efe9dc" />
      <g stroke="#d8d0c2" strokeWidth="8" fill="none">
        <path d="M-20,70 H500" />
        <path d="M-20,170 H500" />
        <path d="M120,-20 V280" />
        <path d="M300,-20 V280" />
        <path d="M40,280 L220,40" />
      </g>
      <g stroke="#cfc6b6" strokeWidth="3" fill="none" opacity="0.7">
        <path d="M-20,120 H500" />
        <path d="M210,-20 V280" />
      </g>
      {/* pin */}
      <g transform="translate(300 120)">
        <path d="M0,0 C18,0 26,-14 26,-26 C26,-42 14,-54 0,-54 C-14,-54 -26,-42 -26,-26 C-26,-14 -18,0 0,0 Z" fill="#b14b3c" />
        <circle cx="0" cy="-30" r="9" fill="#faf7f0" />
      </g>
    </svg>
  )
}
