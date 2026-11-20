import { useEffect, useRef } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { riseChild, staggerParent } from '../ui/motion'
import ProductImage from './ProductImage'
import { useUi, type ConfirmRequest } from '../ui/UiContext'

const settle = { type: 'spring', stiffness: 260, damping: 26 } as const

/** The page behind recedes while the sheet is open. */
function useRecedingPage(open: boolean) {
  useEffect(() => {
    if (!open) return

    const targets = Array.from(document.querySelectorAll<HTMLElement>('main, .drawer__panel'))
    const mainEl = document.querySelector<HTMLElement>('main')
    const centreY = window.scrollY + window.innerHeight / 2 - (mainEl?.offsetTop ?? 0)

    for (const el of targets) {
      el.style.filter = 'brightness(1) blur(0px)'
      if (el === mainEl) el.style.transformOrigin = `50% ${centreY}px`
    }
    const main = targets.filter((el) => el === mainEl)
    const rest = targets.filter((el) => el !== mainEl)
    const runs = [
      ...main.map((el) => animate(el, { scale: 0.94, filter: 'brightness(0.78) blur(2px)' }, settle)),
      ...rest.map((el) => animate(el, { filter: 'brightness(0.78) blur(2px)' }, settle)),
    ]

    return () => {
      runs.forEach((r) => r.stop())
      for (const el of targets) {
        const isMain = el === mainEl
        animate(
          el,
          isMain ? { scale: 1, filter: 'brightness(1) blur(0px)' } : { filter: 'brightness(1) blur(0px)' },
          {
            ...settle,
            // A resting filter would create a stacking context, so drop the inline styles once settled.
            onComplete: () =>
              requestAnimationFrame(() => {
                if (isMain) el.style.transform = ''
                el.style.filter = ''
                el.style.transformOrigin = ''
              }),
          },
        )
      }
    }
  }, [open])
}

function Sheet({ request, onClose }: { request: ConfirmRequest; onClose: () => void }) {
  const keepRef = useRef<HTMLButtonElement>(null)

  // Top edge starts as a tight arch and springs flat, so the sheet feels like it is being pulled up through the page.
  const curve = useMotionValue(2)
  const cap = useTransform(curve, (v) => `M0 24 C 22 ${v} 78 ${v} 100 24 Z`)

  useEffect(() => {
    const run = animate(curve, 24, { type: 'spring', stiffness: 150, damping: 7 })
    return () => run.stop()
  }, [curve])

  useEffect(() => {
    keepRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        onClose()
      } else if (e.key === 'Tab') {
        e.stopImmediatePropagation()
        const buttons = Array.from(document.querySelectorAll<HTMLElement>('.sheet button'))
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    // Capture so the drawer underneath doesn't also react to Escape or Tab.
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [onClose])

  const confirm = () => {
    request.onConfirm()
    onClose()
  }

  return (
    <div className="sheet-root">
      <motion.div
        className="sheet__overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="sheet"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        aria-describedby="sheet-message"
        initial={{ y: '105%', scaleX: 0.9 }}
        animate={{ y: 0, scaleX: 1 }}
        exit={{ y: '105%', scaleX: 0.96 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.9 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.04, bottom: 0.7 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 90 || info.velocity.y > 500) onClose()
        }}
      >
        <svg className="sheet__cap" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
          <motion.path d={cap} />
        </svg>
        <span className="sheet__grip" aria-hidden="true" />

        <motion.div className="sheet__content" variants={staggerParent(0.07, 0.12)} initial="hidden" animate="show">
          {request.product && (
            <motion.div className="sheet__thumb" variants={riseChild}>
              <ProductImage product={request.product} compact className="sheet__img" />
            </motion.div>
          )}
          <motion.h2 id="sheet-title" variants={riseChild}>{request.title}</motion.h2>
          <motion.p id="sheet-message" variants={riseChild}>{request.message}</motion.p>
          <motion.div className="sheet__actions" variants={riseChild}>
            <motion.button className="btn btn--danger btn--block" whileTap={{ scale: 0.97 }} onClick={confirm}>
              {request.confirmLabel}
            </motion.button>
            <motion.button ref={keepRef} className="btn btn--ghost btn--block" whileTap={{ scale: 0.97 }} onClick={onClose}>
              Keep it
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function ConfirmSheet() {
  const { confirm, closeConfirm } = useUi()
  useRecedingPage(!!confirm)

  return <AnimatePresence>{confirm && <Sheet key="sheet" request={confirm} onClose={closeConfirm} />}</AnimatePresence>
}
