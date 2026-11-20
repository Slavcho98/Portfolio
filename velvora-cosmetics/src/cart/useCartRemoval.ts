import { useCallback } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useUi } from '../ui/UiContext'
import { useCart } from './CartContext'
import type { PricedLine } from './pricing'

/**
 * Removal entry points for the UI. On phones every destructive action asks for confirmation
 * through the warp sheet; on larger screens items are removed straight away.
 */
export function useCartRemoval() {
  const { remove, setQty, clear } = useCart()
  const { askConfirm } = useUi()
  const mobile = useMediaQuery('(max-width: 700px)')

  const removeLine = useCallback(
    (line: PricedLine) => {
      if (!mobile) {
        void remove(line.lineId)
        return
      }
      askConfirm({
        title: 'Remove from bag?',
        message: `${line.product.name}${line.variant ? ` (${line.variant})` : ''} will be taken out of your bag.`,
        product: line.product,
        confirmLabel: 'Remove',
        onConfirm: () => void remove(line.lineId),
      })
    },
    [mobile, remove, askConfirm],
  )

  // Stepping a quantity down to zero is a removal too.
  const changeQty = useCallback(
    (line: PricedLine, qty: number) => {
      if (qty <= 0) removeLine(line)
      else void setQty(line.lineId, qty)
    },
    [removeLine, setQty],
  )

  const clearBag = useCallback(
    (count: number) => {
      if (!mobile) {
        void clear()
        return
      }
      askConfirm({
        title: 'Clear your bag?',
        message: `All ${count} ${count === 1 ? 'item' : 'items'} will be removed.`,
        confirmLabel: 'Clear bag',
        onConfirm: () => void clear(),
      })
    },
    [mobile, clear, askConfirm],
  )

  return { removeLine, changeQty, clearBag }
}
