import { useEffect, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { img } from '../data'
import { SITE_URL, absoluteUrl } from '../seo'

const SITE_NAME = 'Velvora'
const DEFAULT_TITLE = 'Velvora – Natural Cosmetics & Beauty'
const DEFAULT_DESCRIPTION =
  'Velvora is a modern cosmetics house: clean skincare, lip colour, hair care and fragrance, formulated with natural ingredients.'
const DEFAULT_IMAGE = img('1583209814683-c023dd293cc6', 1200, 630)

export type SeoProps = {
  /** Page title; the site name is appended. Omit on the home page. */
  title?: string
  description?: string
  /** Relative or absolute image used for link previews. */
  image?: string
  /** Hash path used for the canonical URL, e.g. "#/shop". */
  path?: string
  type?: 'website' | 'product'
  noindex?: boolean
  jsonLd?: object | object[]
  /** Extra tags, e.g. product price meta. */
  children?: ReactNode
}

export default function Seo({ title, description = DEFAULT_DESCRIPTION, image = DEFAULT_IMAGE, path = '', type = 'website', noindex, jsonLd, children }: SeoProps) {
  // index.html ships default tags for crawlers that don't run JS; drop them once Helmet takes over.
  useEffect(() => {
    document.head.querySelectorAll('[data-seo-static]').forEach((el) => el.remove())
  }, [])

  const fullTitle = title ? `${title} – ${SITE_NAME}` : DEFAULT_TITLE
  const url = `${SITE_URL}/${path}`
  const imageUrl = absoluteUrl(image)
  const clean = description.replace(/\s+/g, ' ').trim()
  const summary = clean.length > 160 ? `${clean.slice(0, 157).trimEnd()}…` : clean

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={summary} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type === 'product' ? 'og:product' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={summary} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={summary} />
      <meta name="twitter:image" content={imageUrl} />

      {children}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
