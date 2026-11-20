import { useState, type CSSProperties } from 'react'
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

  return (
    <div
      className={`ph ph--${product.category} ${compact ? 'ph--compact' : ''} ${className}`}
      style={tint ? ({ '--art-liquid': tint } as CSSProperties) : undefined}
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
    </div>
  )
}
