import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { money } from '../cart/pricing'
import { OrderError, PAYMENT_LABELS, orderApi, recallOrder, rememberOrder, type Order } from '../checkout/orderApi'
import { ArrowRight, CheckIcon } from './Icons'
import Seo from './Seo'

function Lookup({ orderNumber, onFound }: { orderNumber: string; onFound: (order: Order) => void }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const order = await orderApi.find(orderNumber, email.trim())
      rememberOrder(order)
      onFound(order)
    } catch (err) {
      setError(err instanceof OrderError ? err.message : 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="cart-empty">
      <h2>Find your order</h2>
      <p>Enter the email you used for order <b>{orderNumber}</b>.</p>
      <form className="lookup" onSubmit={submit}>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" autoComplete="email" />
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Looking…' : 'Find order'}</button>
      </form>
      {error && <p className="checkout__error is-light" role="alert">{error}</p>}
    </div>
  )
}

export default function OrderPage({ orderNumber }: { orderNumber: string }) {
  const [order, setOrder] = useState<Order | null>(() => recallOrder(orderNumber))

  return (
    <section className="cart-page checkout">
      <Seo title="Order confirmed" path={`#/order/${orderNumber}`} noindex />

      {!order ? (
        <Lookup orderNumber={orderNumber} onFound={setOrder} />
      ) : (
        <motion.div className="confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="confirm__tick"><CheckIcon size={30} /></span>
          <span className="eyebrow">Order {order.orderNumber}</span>
          <h1>Thank you, <em>{order.customer.firstName}</em></h1>
          <p className="confirm__lead">
            Your test order is saved. No payment was taken and no email was sent, but the whole order is stored in the database.
          </p>

          <div className="confirm__grid">
            <div className="confirm__card">
              <h2>Items</h2>
              <ul className="co-lines co-lines--light">
                {order.lines.map((l) => (
                  <li key={`${l.productSlug}:${l.variant ?? ''}`}>
                    <span className="co-lines__img"><b>{l.qty}</b></span>
                    <span className="co-lines__name">
                      <a href={`#/product/${encodeURIComponent(l.productSlug)}`}>{l.name}</a>
                      {l.variant && <small>{l.variant}</small>}
                    </span>
                    <span>{money(l.lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <dl className="totals totals--light">
                <div><dt>Subtotal</dt><dd>{money(order.subtotal)}</dd></div>
                {order.discount > 0 && <div><dt>Discount{order.promoCode ? ` · ${order.promoCode}` : ''}</dt><dd>−{money(order.discount)}</dd></div>}
                <div><dt>Shipping</dt><dd>{order.shipping === 0 ? 'Free' : money(order.shipping)}</dd></div>
                <div className="totals__grand"><dt>Total</dt><dd>{money(order.total)}</dd></div>
              </dl>
            </div>

            <div className="confirm__card">
              <h2>Delivery</h2>
              <address>
                {order.customer.firstName} {order.customer.lastName}<br />
                {order.shippingAddress.address1}<br />
                {order.shippingAddress.address2 && <>{order.shippingAddress.address2}<br /></>}
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
                {order.shippingAddress.region && <>, {order.shippingAddress.region}</>}<br />
                {order.shippingAddress.country}
              </address>
              <p className="confirm__meta">{order.customer.email}{order.customer.phone && <> · {order.customer.phone}</>}</p>
              {order.note && <p className="confirm__meta">Note: {order.note}</p>}
              <h2>Payment</h2>
              <p className="confirm__meta">{PAYMENT_LABELS[order.paymentMethod ?? 'cod']} (demo)</p>
            </div>
          </div>

          <a href="#/shop" className="btn">Continue shopping <ArrowRight size={16} /></a>
        </motion.div>
      )}
    </section>
  )
}
