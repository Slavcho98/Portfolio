import React, { createContext, useContext, ReactNode } from "react";

const HighlightedDaysContext = createContext<number[]>([]);

export const useHighlightedDays = () => useContext(HighlightedDaysContext);

interface HighlightedDaysProviderProps {
  highlightedDays: number[];
  children: ReactNode;
}

export const HighlightedDaysProvider: React.FC<
  HighlightedDaysProviderProps
> = ({ highlightedDays, children }) => (
  <HighlightedDaysContext.Provider value={highlightedDays}>
    {children}
  </HighlightedDaysContext.Provider>
);
