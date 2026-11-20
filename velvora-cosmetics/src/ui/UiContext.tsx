import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '../catalog/types'

export type Panel = 'cart' | 'wishlist' | null

export type ConfirmRequest = {
  title: string
  message: string
  product?: Product
  confirmLabel: string
  onConfirm: () => void
}

type UiContextValue = {
  panel: Panel
  open: (panel: Exclude<Panel, null>) => void
  close: () => void
  confirm: ConfirmRequest | null
  askConfirm: (request: ConfirmRequest) => void
  closeConfirm: () => void
}

const UiContext = createContext<UiContextValue | null>(null)

export function UiProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null)
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null)

  const open = useCallback((p: Exclude<Panel, null>) => setPanel(p), [])
  const close = useCallback(() => setPanel(null), [])
  const askConfirm = useCallback((request: ConfirmRequest) => setConfirm(request), [])
  const closeConfirm = useCallback(() => setConfirm(null), [])

  const value = useMemo(
    () => ({ panel, open, close, confirm, askConfirm, closeConfirm }),
    [panel, open, close, confirm, askConfirm, closeConfirm],
  )
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export function useUi() {
  const ctx = useContext(UiContext)
  if (!ctx) throw new Error('useUi must be used inside <UiProvider>')
  return ctx
}
