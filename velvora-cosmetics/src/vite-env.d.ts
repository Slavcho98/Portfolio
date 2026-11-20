/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CART_BACKEND?: 'local' | 'http'
  readonly VITE_API_URL?: string
  readonly VITE_IMAGE_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
