import mongoose from 'mongoose'

const { Schema } = mongoose

const lineSchema = new Schema(
  {
    productSlug: { type: String, required: true },
    sku: String,
    name: { type: String, required: true },
    brand: String,
    variant: String,
    image: String,
    unitPrice: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1 },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false },
)

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    status: { type: String, enum: ['placed', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
    customer: {
      email: { type: String, required: true, lowercase: true, trim: true },
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
    },
    shippingAddress: {
      address1: { type: String, required: true, trim: true },
      address2: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      region: { type: String, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    lines: { type: [lineSchema], validate: (v) => v.length > 0 },
    promoCode: String,
    note: { type: String, trim: true, maxlength: 500 },
    currency: { type: String, default: 'USD' },
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, default: 'test-no-payment' },
  },
  { versionKey: false, timestamps: true },
)

orderSchema.index({ 'customer.email': 1, createdAt: -1 })
orderSchema.index({ createdAt: -1 })

export default mongoose.models.Order ?? mongoose.model('Order', orderSchema)
