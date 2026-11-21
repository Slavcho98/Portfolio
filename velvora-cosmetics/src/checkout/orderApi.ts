import type { CartLine } from '../cart/types'

export type CustomerDetails = { email: string; firstName: string; lastName: string; phone: string }

export type ShippingAddress = {
  address1: string
  address2: string
  city: string
  region: string
  postalCode: string
  country: string
}

export type PaymentMethod = 'cod' | 'apple-pay' | 'google-pay' | 'paypal'

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: 'Pay on delivery',
  'apple-pay': 'Apple Pay',
  'google-pay': 'Google Pay',
  paypal: 'PayPal',
}

export type OrderRequest = {
  customer: CustomerDetails
  shippingAddress: ShippingAddress
  note?: string
  promoCode?: string
  paymentMethod: PaymentMethod
  lines: Pick<CartLine, 'productId' | 'variant' | 'qty'>[]
}

export type OrderLine = {
  productSlug: string
  name: string
  brand?: string
  variant?: string
  image?: string
  unitPrice: number
  qty: number
  lineTotal: number
}

/** The order exactly as stored in MongoDB: prices here were calculated by the server. */
export type Order = {
  orderNumber: string
  status: string
  customer: CustomerDetails
  shippingAddress: ShippingAddress
  lines: OrderLine[]
  promoCode?: string
  note?: string
  paymentMethod?: PaymentMethod
  subtotal: number
  discount: number
  shipping: number
  total: number
  createdAt: string
}

export class OrderError extends Error {
  fields: Record<string, string>
  constructor(message: string, fields: Record<string, string> = {}) {
    super(message)
    this.fields = fields
  }
}

const base = () => import.meta.env.VITE_API_URL ?? '/api'

async function parse<T>(res: Response): Promise<T> {
  if (res.ok) return (await res.json()) as T
  const data = (await res.json().catch(() => null)) as { message?: string; fields?: Record<string, string> } | null
  throw new OrderError(data?.message ?? 'We could not reach the server. Please try again.', data?.fields)
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  try {
    return await parse<T>(await fetch(`${base()}${path}`, init))
  } catch (error) {
    if (error instanceof OrderError) throw error
    throw new OrderError('We could not reach the server. Please try again in a moment.')
  }
}

export const orderApi = {
  place: (order: OrderRequest) =>
    request<Order>('/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) }),
  find: (orderNumber: string, email: string) =>
    request<Order>(`/orders/${encodeURIComponent(orderNumber)}?email=${encodeURIComponent(email)}`),
}

const key = (orderNumber: string) => `velvora.order.${orderNumber}`

/** Keeps the confirmation page working after a refresh without asking for the email again. */
export const rememberOrder = (order: Order) => {
  try {
    sessionStorage.setItem(key(order.orderNumber), JSON.stringify(order))
  } catch {
    // private mode: the lookup form on the confirmation page still works
  }
}

export const recallOrder = (orderNumber: string): Order | null => {
  try {
    const raw = sessionStorage.getItem(key(orderNumber))
    return raw ? (JSON.parse(raw) as Order) : null
  } catch {
    return null
  }
}
