import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { money } from '../cart/pricing'

/** Counts smoothly from the previous amount to the new one. */
export default function AnimatedMoney({ value, className }: { value: number; className?: string }) {
  const amount = useMotionValue(value)
  const text = useTransform(amount, (v) => money(v))

  useEffect(() => {
    const controls = animate(amount, value, { duration: 0.6, ease: 'easeOut' })
    return () => controls.stop()
  }, [amount, value])

  return <motion.span className={className}>{text}</motion.span>
}
