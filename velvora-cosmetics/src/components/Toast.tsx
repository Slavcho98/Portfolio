import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { useUi } from '../ui/UiContext'
import { CheckIcon, CloseIcon } from './Icons'

export default function Toast() {
  const { notice, dismissNotice } = useCart()
  const { open } = useUi()

  useEffect(() => {
    if (!notice) return
    const t = setTimeout(dismissNotice, 4000)
    return () => clearTimeout(t)
  }, [notice, dismissNotice])

  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence mode="wait">
        {notice && (
          <motion.div
            className="toast"
            key={notice.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          >
            <motion.span
              className="toast__icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.1 }}
            >
              <CheckIcon size={14} />
            </motion.span>
            <p>{notice.text}</p>
            {notice.action && (
              <button
                className="toast__action"
                onClick={() => {
                  open(notice.action!.panel)
                  dismissNotice()
                }}
              >
                {notice.action.label}
              </button>
            )}
            <button className="toast__close" aria-label="Dismiss" onClick={dismissNotice}><CloseIcon size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
