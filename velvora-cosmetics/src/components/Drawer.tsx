import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import { drawerSpring } from '../ui/motion'
import { CloseIcon } from './Icons'

type Props = {
  open: boolean
  onClose: () => void
  label: string
  title: ReactNode
  count?: number
  footer?: ReactNode
  children: ReactNode
}

export default function Drawer({ open, onClose, label, title, count, footer, children }: Props) {
  const panelRef = useRef<HTMLElement>(null)
  const controls = useDragControls()

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), textarea, input')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus())

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="drawer" key="drawer">
          <motion.div
            className="drawer__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            className="drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ x: '108%' }}
            animate={{ x: 0 }}
            exit={{ x: '108%' }}
            transition={drawerSpring}
            drag="x"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 120 || info.velocity.x > 500) onClose()
            }}
          >
            <header className="drawer__head" onPointerDown={(e) => controls.start(e)}>
              <h2>
                {title}
                {count !== undefined && count > 0 && <span className="drawer__count">{count}</span>}
              </h2>
              <motion.button
                className="icon-btn"
                aria-label="Close"
                data-autofocus
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.88 }}
                onClick={onClose}
              >
                <CloseIcon size={20} />
              </motion.button>
            </header>

            <div className="drawer__body">{children}</div>
            {footer && <footer className="drawer__foot">{footer}</footer>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
