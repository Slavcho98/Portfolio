export type ProductId = string // product slug

/**
 * What gets persisted. Keep it minimal: no prices, names or images.
 * Prices are always derived from the catalogue (and, with a backend, re-checked server side).
 * Maps 1:1 onto a MongoDB `carts` document: { _id, userId | sessionId, lines[], promoCode, note, updatedAt }.
 */
export type CartLine = {
  lineId: string
  productId: ProductId
  variant?: string
  qty: number
}

export type CartState = {
  lines: CartLine[]
  promoCode?: string
  note?: string
}

export type AddItemInput = { productId: ProductId; variant?: string; qty?: number }

/** Every mutation resolves with the full, updated cart (exactly what a REST endpoint would return). */
export interface CartApi {
  get(): Promise<CartState>
  addItem(input: AddItemInput): Promise<CartState>
  setQty(lineId: string, qty: number): Promise<CartState>
  removeItem(lineId: string): Promise<CartState>
  applyPromo(code: string): Promise<CartState>
  removePromo(): Promise<CartState>
  setNote(note: string): Promise<CartState>
  clear(): Promise<CartState>
}
