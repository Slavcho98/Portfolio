import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { money } from '../cart/pricing'
import {
  OrderError,
  orderApi,
  rememberOrder,
  type CustomerDetails,
  type ShippingAddress,
} from '../checkout/orderApi'
import { ArrowLeft, ArrowRight, BagIcon, ShieldIcon } from './Icons'
import ProductImage from './ProductImage'
import Seo from './Seo'
import SortSelect from './SortSelect'

const COUNTRIES = [
  'North Macedonia', 'Albania', 'Austria', 'Bulgaria', 'Croatia', 'France', 'Germany', 'Greece', 'Italy',
  'Netherlands', 'Serbia', 'Slovenia', 'Spain', 'United Kingdom', 'United States',
].map((c) => ({ value: c, label: c }))

type Errors = Record<string, string>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(customer: CustomerDetails, address: ShippingAddress): Errors {
  const errors: Errors = {}
  if (!EMAIL.test(customer.email.trim())) errors['customer.email'] = 'Enter a valid email address'
  if (!customer.firstName.trim()) errors['customer.firstName'] = 'Required'
  if (!customer.lastName.trim()) errors['customer.lastName'] = 'Required'
  if (!address.address1.trim()) errors['shippingAddress.address1'] = 'Required'
  if (!address.city.trim()) errors['shippingAddress.city'] = 'Required'
  if (!address.postalCode.trim()) errors['shippingAddress.postalCode'] = 'Required'
  if (!address.country) errors['shippingAddress.country'] = 'Required'
  return errors
}

type FieldProps = {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  autoComplete?: string
  optional?: boolean
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
}

function Field({ name, label, value, onChange, error, type = 'text', autoComplete, optional, inputMode }: FieldProps) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span>{label}{optional && <em> (optional)</em>}</span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <small role="alert">{error}</small>}
    </label>
  )
}

export default function CheckoutPage() {
  const { cart, priced, loading, clear } = useCart()
  const [customer, setCustomer] = useState<CustomerDetails>({ email: '', firstName: '', lastName: '', phone: '' })
  const [address, setAddress] = useState<ShippingAddress>({ address1: '', address2: '', city: '', region: '', postalCode: '', country: 'North Macedonia' })
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const setC = (patch: Partial<CustomerDetails>) => setCustomer((c) => ({ ...c, ...patch }))
  const setA = (patch: Partial<ShippingAddress>) => setAddress((a) => ({ ...a, ...patch }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    const found = validate(customer, address)
    setErrors(found)
    setFormError(null)
    if (Object.keys(found).length) {
      setFormError('Please check the highlighted fields')
      document.querySelector('.field.has-error input')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    setSubmitting(true)
    try {
      const order = await orderApi.place({
        customer,
        shippingAddress: address,
        note: cart.note,
        promoCode: cart.promoCode,
        lines: cart.lines.map(({ productId, variant, qty }) => ({ productId, variant, qty })),
      })
      rememberOrder(order)
      window.location.hash = `#/order/${order.orderNumber}`
      await clear()
    } catch (error) {
      if (error instanceof OrderError) {
        setErrors(error.fields)
        setFormError(error.message)
      } else {
        setFormError('Something went wrong. Please try again.')
      }
      setSubmitting(false)
    }
  }

  const empty = !loading && priced.lines.length === 0

  return (
    <section className="cart-page checkout">
      <Seo title="Checkout" path="#/checkout" noindex />
      <a href="#/cart" className="back-link"><ArrowLeft size={16} /> Back to bag</a>

      <header className="cart-head">
        <h1>Check<em>out</em></h1>
      </header>

      {empty ? (
        <motion.div className="cart-empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="cart-empty__icon"><BagIcon size={30} /></span>
          <h2>Your bag is empty</h2>
          <p>Add a few favourites before checking out.</p>
          <a href="#/shop" className="btn">Start shopping <ArrowRight size={16} /></a>
        </motion.div>
      ) : (
        <form className="cart-layout" onSubmit={submit} noValidate>
          <div className="checkout__main">
            <p className="checkout__test" role="note">
              <ShieldIcon size={16} /> Test store: no payment is taken and no email is sent. Your order is saved to the database so you can see it working.
            </p>

            <fieldset className="cform">
              <legend>Contact</legend>
              <Field name="email" type="email" inputMode="email" autoComplete="email" label="Email" value={customer.email} onChange={(email) => setC({ email })} error={errors['customer.email']} />
            </fieldset>

            <fieldset className="cform">
              <legend>Delivery</legend>
              <div className="cform__grid">
                <Field name="firstName" autoComplete="given-name" label="First name" value={customer.firstName} onChange={(firstName) => setC({ firstName })} error={errors['customer.firstName']} />
                <Field name="lastName" autoComplete="family-name" label="Last name" value={customer.lastName} onChange={(lastName) => setC({ lastName })} error={errors['customer.lastName']} />
                <div className="cform__wide">
                  <Field name="address1" autoComplete="address-line1" label="Address" value={address.address1} onChange={(address1) => setA({ address1 })} error={errors['shippingAddress.address1']} />
                </div>
                <div className="cform__wide">
                  <Field name="address2" autoComplete="address-line2" label="Apartment, suite, etc." optional value={address.address2} onChange={(address2) => setA({ address2 })} />
                </div>
                <Field name="city" autoComplete="address-level2" label="City" value={address.city} onChange={(city) => setA({ city })} error={errors['shippingAddress.city']} />
                <Field name="postalCode" autoComplete="postal-code" label="Postal code" value={address.postalCode} onChange={(postalCode) => setA({ postalCode })} error={errors['shippingAddress.postalCode']} />
                <Field name="region" autoComplete="address-level1" label="State / region" optional value={address.region} onChange={(region) => setA({ region })} />
                <div className={`field field--select ${errors['shippingAddress.country'] ? 'has-error' : ''}`}>
                  <span>Country</span>
                  <SortSelect label="Country" value={address.country} options={COUNTRIES} onChange={(country) => setA({ country })} />
                </div>
                <div className="cform__wide">
                  <Field name="phone" type="tel" inputMode="tel" autoComplete="tel" label="Phone" optional value={customer.phone} onChange={(phone) => setC({ phone })} />
                </div>
              </div>
            </fieldset>

            <fieldset className="cform">
              <legend>Payment</legend>
              <div className="pay-demo">
                <span className="pay-demo__dot" aria-hidden="true" />
                <div>
                  <strong>Pay on delivery (demo)</strong>
                  <p>There is no payment provider connected, so nothing is charged.</p>
                </div>
              </div>
            </fieldset>
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <h2>Your order</h2>

            <ul className="co-lines">
              {priced.lines.map((l) => (
                <li key={l.lineId}>
                  <span className="co-lines__img">
                    <ProductImage product={l.product} compact />
                    <b>{l.qty}</b>
                  </span>
                  <span className="co-lines__name">
                    {l.product.name}
                    {l.variant && <small>{l.variant}</small>}
                  </span>
                  <span>{money(l.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <dl className="totals">
              <div><dt>Subtotal</dt><dd>{money(priced.subtotal)}</dd></div>
              {priced.discount > 0 && (
                <div className="is-discount"><dt>Discount{cart.promoCode ? ` · ${cart.promoCode}` : ''}</dt><dd>−{money(priced.discount)}</dd></div>
              )}
              <div><dt>Shipping</dt><dd>{priced.shipping === 0 ? 'Free' : money(priced.shipping)}</dd></div>
              <div className="totals__grand"><dt>Total</dt><dd>{money(priced.total)}</dd></div>
            </dl>

            {formError && <p className="checkout__error" role="alert">{formError}</p>}

            <motion.button className="btn btn--light btn--block" type="submit" disabled={submitting || loading} whileTap={{ scale: 0.97 }}>
              {submitting ? 'Placing order…' : <>Place order · {money(priced.total)}</>}
            </motion.button>
          </aside>
        </form>
      )}
    </section>
  )
}
