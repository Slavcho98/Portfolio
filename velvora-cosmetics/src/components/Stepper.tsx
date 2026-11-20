import { AnimatePresence, motion } from 'motion/react'
import { MAX_QTY } from '../cart/pricing'
import { MinusIcon, PlusIcon } from './Icons'

type Props = {
  name: string
  qty: number
  onChange: (qty: number) => void
  /** Lowest quantity the minus button allows (0 lets the cart remove a line). */
  min?: number
  max?: number
}

export default function Stepper({ name, qty, onChange, min = 0, max = MAX_QTY }: Props) {
  return (
    <div className="stepper" role="group" aria-label={`Quantity of ${name}`}>
      <motion.button whileTap={{ scale: 0.85 }} aria-label="Decrease quantity" disabled={qty <= min && min > 0} onClick={() => onChange(qty - 1)}>
        <MinusIcon size={14} />
      </motion.button>
      <span className="stepper__value" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.output
            key={qty}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {qty}
          </motion.output>
        </AnimatePresence>
      </span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        aria-label="Increase quantity"
        disabled={qty >= max}
        onClick={() => onChange(qty + 1)}
      >
        <PlusIcon size={14} />
      </motion.button>
    </div>
  )
}
