import { motion } from 'motion/react'
import { collections } from '../data'
import { riseChild, staggerParent } from '../ui/motion'
import { ArrowRight } from './Icons'

export default function Collections() {
  return (
    <motion.section
      className="collections"
      id="collections"
      variants={staggerParent(0.14)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {collections.map((c) => (
        <motion.a href={c.href} className="collection" key={c.title} variants={riseChild} whileTap={{ scale: 0.985 }}>
          <img src={c.image} alt="" loading="lazy" />
          <div className="collection__text">
            <span className="chip chip--glass">{c.kicker}</span>
            <h3>{c.title}</h3>
          </div>
          <span className="collection__go" aria-hidden="true"><ArrowRight size={18} /></span>
        </motion.a>
      ))}
    </motion.section>
  )
}
