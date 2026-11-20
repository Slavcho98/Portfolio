// Set VITE_SITE_URL in production so canonical, share and structured-data URLs use the real domain.
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? window.location.origin).replace(/\/$/, '')

export const absoluteUrl = (src: string) => (/^https?:\/\//.test(src) ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`)
