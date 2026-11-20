import { LeafIcon, ShieldIcon, SupportIcon, TruckIcon } from './Icons'

const items = [
  { icon: <TruckIcon size={20} />, label: 'Free shipping over $100' },
  { icon: <SupportIcon size={20} />, label: '24/7 support' },
  { icon: <ShieldIcon size={20} />, label: '30-day money-back guarantee' },
  { icon: <LeafIcon size={20} />, label: 'Every product is eco-certified' },
]

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Our promises">
      <div className="marquee__track">
        {[0, 1, 2, 3].map((n) => (
          <ul key={n} aria-hidden={n > 0}>
            {items.map((i) => (
              <li key={i.label}><span className="marquee__icon">{i.icon}</span>{i.label}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
