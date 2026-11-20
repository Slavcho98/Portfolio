import { motion, type Variants } from 'motion/react'
import { images } from '../data'
import { riseChild, staggerParent } from '../ui/motion'
import { ArrowRight } from './Icons'

const badgeText = 'ALL PRODUCTS IS NATURAL ・ 2000+ CUSTOMERS ・ '

const panel: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1], staggerChildren: 0.1, delayChildren: 0.35 },
  },
}

export default function Hero() {
  return (
    <motion.section className="hero" variants={staggerParent(0.18)} initial="hidden" animate="show">
      <motion.article
        className="hero__panel"
        style={{ backgroundImage: `url(${images.heroLeft})` }}
        variants={panel}
      >
        <svg className="hero__badge" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <circle cx="60" cy="60" r="58" fill="rgba(255,255,255,.55)" />
          <text fontSize="7.2" fill="#16121a">
            <textPath href="#badge-circle" textLength="284" lengthAdjust="spacing">{badgeText}</textPath>
          </text>
        </svg>
        <div className="hero__text">
          <motion.span className="chip" variants={riseChild}>Package</motion.span>
          <motion.h2 variants={riseChild}>Premium</motion.h2>
          <motion.p variants={riseChild}>Refillable glass, clean formulas, zero fuss.</motion.p>
          <motion.a href="#/shop" className="btn" variants={riseChild} whileTap={{ scale: 0.96 }}>
            Shop the edit <ArrowRight size={16} />
          </motion.a>
        </div>
      </motion.article>

      <motion.article
        className="hero__panel hero__panel--warm"
        style={{ backgroundImage: `url(${images.heroRight})` }}
        variants={panel}
      >
        <div className="hero__text">
          <motion.span className="chip" variants={riseChild}>New brand</motion.span>
          <motion.h2 variants={riseChild}>Touch</motion.h2>
          <motion.p variants={riseChild}>Velvet-finish colour for lips and skin.</motion.p>
          <motion.a href="#collections" className="btn" variants={riseChild} whileTap={{ scale: 0.96 }}>
            Explore <ArrowRight size={16} />
          </motion.a>
        </div>
      </motion.article>
    </motion.section>
  )
}
