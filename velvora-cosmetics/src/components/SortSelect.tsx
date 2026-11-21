import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckIcon, ChevronDown } from './Icons'

type Option<T extends string> = { value: T; label: string }

type Props<T extends string> = {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  label: string
  prefix?: string
}

export default function SortSelect<T extends string>({ value, options, onChange, label, prefix }: Props<T>) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const id = useId()
  const selected = options.findIndex((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [open])

  const openMenu = () => {
    setActive(Math.max(selected, 0))
    setOpen(true)
  }

  const choose = (i: number) => {
    onChange(options[i].value)
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') return setOpen(false)
    if (e.key === 'Tab') return setOpen(false)
    if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) return
    e.preventDefault()
    if (!open) return openMenu()
    if (e.key === 'ArrowDown') setActive((a) => (a + 1) % options.length)
    else if (e.key === 'ArrowUp') setActive((a) => (a - 1 + options.length) % options.length)
    else choose(active)
  }

  return (
    <div className="sort" ref={root}>
      <button
        type="button"
        className={`sort__trigger ${open ? 'is-open' : ''}`}
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        <span>{prefix}{options[selected]?.label}</span>
        <ChevronDown size={14} aria-hidden="true" className="sort__chevron" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            role="listbox"
            aria-label={label}
            className="sort__menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            {options.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                className={`${i === active ? 'is-active' : ''} ${o.value === value ? 'is-selected' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
              >
                <span>{o.label}</span>
                {o.value === value && <CheckIcon size={15} aria-hidden="true" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
