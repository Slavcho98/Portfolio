import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useCatalog } from '../catalog/CatalogContext'
import { onSale } from '../catalog/selectors'
import { images } from '../data'
import { reveal } from '../ui/motion'
import { ArrowRight, ChevronLeft, ChevronRight } from './Icons'
import ProductCard from './ProductCard'
import ProductSkeletons from './ProductSkeletons'

const SEVEN_DAYS = 7 * 24 * 3600 * 1000

function useCountdown() {
  const [target] = useState(() => Date.now() + SEVEN_DAYS)
  const [left, setLeft] = useState(SEVEN_DAYS)

  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000)
    return () => clearInterval(t)
  }, [target])

  const s = Math.floor(left / 1000)
  return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor((s % 86400) / 3600),
    Minutes: Math.floor((s % 3600) / 60),
    Seconds: s % 60,
  }
}

export default function Discounts() {
  const time = useCountdown()
  const track = useRef<HTMLDivElement>(null)
  const { products, status } = useCatalog()
  const deals = onSale(products, 10)

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * (el.clientWidth / 2), behavior: 'smooth' })
  }

  return (
    <motion.section className="discounts" {...reveal}>
      <div className="discounts__intro" style={{ backgroundImage: `url(${images.discount})` }}>
        <span className="chip">Limited time</span>
        <h2>Big <em>discounts</em></h2>
        <div className="countdown" role="timer" aria-label="Time left on the sale">
          {Object.entries(time).map(([label, value]) => (
            <div key={label}>
              <strong>{String(value).padStart(2, '0')}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p>Velvora is a beauty brand committed to high-quality, all-natural products at fair prices.</p>
        <a href="#/shop?collection=sale" className="btn">Shop the sale <ArrowRight size={16} /></a>
      </div>

      <div className="discounts__slider">
        <div className="discounts__track" ref={track}>
          {status === 'loading' && (
            Array.from({ length: 3 }, (_, i) => (
              <div className="discounts__slide" key={i}><div className="grid__item"><ProductSkeletons count={1} /></div></div>
            ))
          )}
          {deals.map((p) => (
            <div className="discounts__slide" key={p.slug}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="discounts__nav">
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => scroll(-1)} aria-label="Previous products"><ChevronLeft size={18} /></motion.button>
          <motion.button whileTap={{ scale: 0.88 }} onClick={() => scroll(1)} aria-label="Next products"><ChevronRight size={18} /></motion.button>
        </div>
      </div>
    </motion.section>
  )
}
