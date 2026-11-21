import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Drawer from './Drawer'
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

function Sheet({ open, onClose, label, title, count, footer, children }: Props) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="sheet-root" key="sheet">
          <motion.div
            className="sheet__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 300) onClose()
            }}
            style={{ maxHeight: '90vh', borderRadius: '28px 28px 0 0', display: 'flex', flexDirection: 'column', padding: '28px 0 0', textAlign: 'left' }}
          >
            <div className="sheet__grip" />

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', touchAction: 'pan-y', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 24px 12px', gap: '12px', flexShrink: 0 }}>
                <h2 style={{ fontSize: '32px', margin: 0, flex: 1 }}>
                  {title}
                </h2>
                {count !== undefined && count > 0 && (
                  <span className="drawer__count">{count}</span>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CloseIcon size={20} />
                </button>
              </div>
              <div style={{ padding: '0 24px 20px', flex: 1 }}>
                {children}
              </div>
            </div>

            {footer && (
              <div style={{
                padding: '16px 24px calc(20px + env(safe-area-inset-bottom))',
                borderTop: '1px solid var(--line)',
                background: 'var(--paper)',
                flexShrink: 0,
              }}>
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function MobileSheet({ open, onClose, label, title, count, footer, children }: Props) {
  const desktop = useMediaQuery('(min-width: 993px)')

  if (desktop) {
    return <Drawer open={open} onClose={onClose} label={label} title={title} count={count} footer={footer}>{children}</Drawer>
  }

  return <Sheet open={open} onClose={onClose} label={label} title={title} count={count} footer={footer}>{children}</Sheet>
}
