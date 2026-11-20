import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { images } from '../data'
import { reveal } from '../ui/motion'
import { CloseIcon, PlayIcon } from './Icons'

export default function VideoBanner() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  return (
    <motion.section ref={ref} className="video" {...reveal}>
      <motion.div className="video__bg" style={{ backgroundImage: `url(${images.video})`, y }} />
      <motion.button
        className="video__play"
        aria-label="Play brand presentation"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(true)}
      >
        <PlayIcon size={28} />
      </motion.button>
      <h2>Watch the <em>brand</em> presentation</h2>

      <AnimatePresence>
        {open && (
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="modal__box"
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal__close" aria-label="Close" onClick={() => setOpen(false)}>
                <CloseIcon size={20} />
              </button>
              <h3>Brand film coming soon</h3>
              <p>Drop your own video embed into this dialog to replace the placeholder.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
