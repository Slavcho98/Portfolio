import { useRef, useState, type CSSProperties, type TouchEvent } from 'react'
import { imageUrl } from '../catalog/selectors'
import type { Product } from '../catalog/types'
import { CATEGORY_ICONS } from './Icons'
import ProductArt from './ProductArt'

type Props = {
  product: Pick<Product, 'name' | 'category' | 'images'> & { slug?: string; brand?: string }
  /** Larger icon, for small thumbnails. */
  compact?: boolean
  className?: string
  /** Colours the placeholder product, e.g. with the selected shade. */
  tint?: string
  /** Enables the hover state: a second photo if there is one, otherwise a texture swatch with this caption. */
  texture?: string
}

type LoadState = 'loading' | 'loaded' | 'failed'

/**
 * A category-tinted placeholder that always sits behind the photo. The real image fades in once it has
 * loaded, so products without a file yet (public/products/<slug>-1.webp) simply keep the placeholder
 * and never flash a broken image.
 */
export default function ProductImage({ product, compact, className = '', tint, texture }: Props) {
  const [first, second] = product.images
  const [state, setState] = useState<LoadState>('loading')
  const [altState, setAltState] = useState<LoadState>('loading')
  const Icon = CATEGORY_ICONS[product.category]
  const hasAlt = !compact && !!texture && !!second && altState !== 'failed'
  // Real photos replace the illustrated placeholder, so the fake texture swatch is only for products without one.
  const showSwatch = !compact && !!texture && !(first && state === 'loaded') && !(second && altState === 'loaded')
  // Touch screens can't hover, so the second photo / texture is reached by swiping instead.
  const canSlide = !compact && !!texture && (hasAlt || showSwatch)
  const [slide, setSlide] = useState(0)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)

  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current
    touch.current = null
    if (!start || !canSlide) return
    const dx = e.changedTouches[0].clientX - start.x
    const dy = e.changedTouches[0].clientY - start.y
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    setSlide(dx < 0 ? 1 : 0)
    swiped.current = true
    setTimeout(() => { swiped.current = false }, 350)
  }

  return (
    <div
      className={`ph ph--${product.category} ${compact ? 'ph--compact' : ''} ${slide ? 'ph--slide2' : ''} ${className}`}
      style={tint ? ({ '--art-liquid': tint } as CSSProperties) : undefined}
      onTouchStart={canSlide ? onTouchStart : undefined}
      onTouchEnd={canSlide ? onTouchEnd : undefined}
      onClickCapture={(e) => { if (swiped.current) { e.preventDefault(); e.stopPropagation() } }}
      role="img"
      aria-label={product.name}
    >
      {compact ? (
        <Icon className="ph__icon" aria-hidden="true" />
      ) : (
        <ProductArt category={product.category} seed={product.slug ?? product.name} brand={product.brand} vary={!tint} />
      )}
      {first && state !== 'failed' && (
        <img
          className={`ph__img ${state === 'loaded' ? 'is-loaded' : ''}`}
          src={imageUrl(first.src)}
          alt=""
          loading="lazy"
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
        />
      )}
      {hasAlt && (
        <img
          className={`ph__img ph__img--alt ${altState === 'loaded' ? 'is-loaded' : ''}`}
          src={imageUrl(second.src)}
          alt=""
          loading="lazy"
          onLoad={() => setAltState('loaded')}
          onError={() => setAltState('failed')}
        />
      )}
      {showSwatch && (
        <span className="ph__texture" aria-hidden="true">
          <i />
          <i />
          <em>{texture}</em>
        </span>
      )}
      {canSlide && (
        <span className="ph__dots" aria-hidden="true">
          <i className={slide === 0 ? 'is-on' : ''} />
          <i className={slide === 1 ? 'is-on' : ''} />
        </span>
      )}
    </div>
  )
}
