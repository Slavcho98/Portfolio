import { useId } from 'react'
import type { CategorySlug } from '../catalog/types'

// A small studio-style product illustration, shown until a real photo exists for the product.
// Colours come from CSS variables (see .ph--<category> in shop.css) so each category has its own palette.

function hash(text: string) {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0
  return Math.abs(h)
}

type Props = { category: CategorySlug; seed: string; brand?: string; vary?: boolean }

export default function ProductArt({ category, seed, brand = 'Velvora', vary = true }: Props) {
  const uid = useId().replace(/:/g, '')
  const glass = `${uid}-glass`
  const shine = `${uid}-shine`
  const h = hash(seed)
  // Small per-product variation so a grid of one category doesn't look cloned.
  const hue = vary ? (h % 41) - 20 : 0
  const tilt = ((h >> 3) % 7) - 3
  const label = brand.toUpperCase().slice(0, 14)

  const drawLabel = (x: number, y: number, w: number, hgt: number) => (
    <g>
      <rect x={x} y={y} width={w} height={hgt} rx="4" fill="#fff" opacity=".88" />
      <text x={x + w / 2} y={y + hgt * 0.45} textAnchor="middle" fontSize="6.5" letterSpacing="1.4" fontWeight="600" fill="var(--art-ink)">{label}</text>
      <rect x={x + w * 0.25} y={y + hgt * 0.62} width={w * 0.5} height="2" rx="1" fill="var(--art-ink)" opacity=".25" />
    </g>
  )

  let shape
  switch (category) {
    case 'skincare':
      shape = (
        <>
          <rect x="85" y="26" width="30" height="38" rx="15" fill="var(--art-cap)" />
          <rect x="82" y="60" width="36" height="16" rx="4" fill="var(--art-metal)" />
          <rect x="62" y="74" width="76" height="128" rx="20" fill={`url(#${glass})`} />
          <rect x="66" y="112" width="68" height="86" rx="16" fill="var(--art-liquid)" opacity=".85" />
          {drawLabel(76, 128, 48, 48)}
          <rect x="70" y="84" width="6" height="108" rx="3" fill={`url(#${shine})`} />
        </>
      )
      break
    case 'lips':
      shape = (
        <>
          <path d="M78 94 V60 Q78 42 98 36 L124 54 V94 Z" fill="var(--art-liquid)" />
          <path d="M98 36 L124 54 V62 L98 44 Z" fill="#fff" opacity=".28" />
          <rect x="74" y="92" width="52" height="26" rx="4" fill="var(--art-metal)" />
          <rect x="70" y="116" width="60" height="86" rx="10" fill="var(--art-cap)" />
          <rect x="70" y="116" width="60" height="8" fill="var(--art-metal)" opacity=".7" />
          <rect x="76" y="132" width="8" height="64" rx="4" fill="#fff" opacity=".18" />
          <text x="100" y="170" textAnchor="middle" fontSize="7" letterSpacing="1.6" fontWeight="600" fill="#fff" opacity=".85">{label}</text>
        </>
      )
      break
    case 'hair':
      shape = (
        <>
          <path d="M104 52 h34 q4 0 4 4 v4 h-38 z" fill="var(--art-cap)" />
          <rect x="88" y="52" width="24" height="14" rx="5" fill="var(--art-cap)" />
          <rect x="94" y="64" width="12" height="18" fill="var(--art-metal)" />
          <rect x="60" y="80" width="80" height="122" rx="22" fill={`url(#${glass})`} />
          <rect x="64" y="118" width="72" height="80" rx="18" fill="var(--art-liquid)" opacity=".85" />
          {drawLabel(74, 128, 52, 52)}
          <rect x="68" y="90" width="6" height="100" rx="3" fill={`url(#${shine})`} />
        </>
      )
      break
    case 'eye':
      shape = (
        <>
          <rect x="82" y="28" width="36" height="70" rx="10" fill="var(--art-cap)" />
          <rect x="82" y="92" width="36" height="8" fill="var(--art-metal)" />
          <rect x="78" y="98" width="44" height="104" rx="12" fill={`url(#${glass})`} />
          <rect x="82" y="124" width="36" height="74" rx="9" fill="var(--art-liquid)" opacity=".9" />
          <text x="100" y="168" textAnchor="middle" fontSize="6" letterSpacing="1.2" fontWeight="600" fill="#fff" transform="rotate(-90 100 162)">{label}</text>
          <rect x="86" y="30" width="5" height="62" rx="2.5" fill="#fff" opacity=".22" />
        </>
      )
      break
    case 'makeup':
      shape = (
        <>
          <rect x="36" y="104" width="128" height="98" rx="22" fill="var(--art-cap)" />
          <rect x="36" y="104" width="128" height="14" rx="7" fill="var(--art-metal)" opacity=".7" />
          {[[66, 146, 'var(--art-liquid)'], [100, 146, 'var(--art-a)'], [134, 146, 'var(--art-b)'], [83, 182, 'var(--art-b)'], [117, 182, 'var(--art-liquid)']].map(([cx, cy, fill], i) => (
            <g key={i}>
              <circle cx={cx as number} cy={cy as number} r="15" fill="#000" opacity=".25" />
              <circle cx={cx as number} cy={cy as number} r="13" fill={fill as string} />
              <circle cx={(cx as number) - 4} cy={(cy as number) - 4} r="4" fill="#fff" opacity=".35" />
            </g>
          ))}
          <text x="100" y="116" textAnchor="middle" fontSize="6.5" letterSpacing="1.8" fontWeight="600" fill="#fff" opacity=".85">{label}</text>
        </>
      )
      break
    default:
      shape = (
        <>
          <rect x="80" y="30" width="40" height="46" rx="8" fill="var(--art-cap)" />
          <rect x="76" y="70" width="48" height="14" rx="3" fill="var(--art-metal)" />
          <rect x="92" y="82" width="16" height="16" fill={`url(#${glass})`} />
          <rect x="56" y="96" width="88" height="106" rx="16" fill={`url(#${glass})`} />
          <rect x="60" y="116" width="80" height="82" rx="13" fill="var(--art-liquid)" opacity=".8" />
          {drawLabel(74, 140, 52, 34)}
          <rect x="64" y="104" width="6" height="88" rx="3" fill={`url(#${shine})`} />
        </>
      )
  }

  return (
    <svg className="ph__art" viewBox="0 0 200 240" aria-hidden="true" style={{ filter: `hue-rotate(${hue}deg)` }}>
      <defs>
        <linearGradient id={glass} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="var(--art-glass)" stopOpacity=".9" />
        </linearGradient>
        <linearGradient id={shine} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse className="ph__shadow" cx="100" cy="206" rx="56" ry="7" />
      <g transform={`rotate(${tilt} 100 204)`}>{shape}</g>
    </svg>
  )
}
