import type { MotionProps, Variants } from 'motion/react'

const easeOutExpo: [number, number, number, number] = [0.2, 0.7, 0.2, 1]

/** Spread onto any motion element to fade/slide it in once when it scrolls into view. */
export const reveal: MotionProps = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -8% 0px' },
  transition: { duration: 0.8, ease: easeOutExpo },
}

export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const riseChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
}

export const slideChild: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: easeOutExpo } },
}

export const drawerSpring = { type: 'spring', stiffness: 380, damping: 38 } as const
