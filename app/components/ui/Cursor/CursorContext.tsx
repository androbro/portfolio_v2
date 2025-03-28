"use client";

import { createContext, ReactNode, useContext, useState } from 'react';

interface CursorContextType {
  initialCursorVariant: string;
  setInitialCursorVariant: (variant: string) => void;
  animateCursorVariant: string;
  setAnimateCursorVariant: (variant: string) => void;
  animateCursor: (variant: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursorContext must be used within a CursorContextProvider');
  }
  return context;
};

interface CursorContextProviderProps {
  children: ReactNode;
}

export const CursorContextProvider = ({ children }: CursorContextProviderProps) => {
  const [initialCursorVariant, setInitialCursorVariant] = useState('');
  const [animateCursorVariant, setAnimateCursorVariant] = useState('');

  // This function allows for smooth transitions between cursor states
  const animateCursor = (variant: string) => {
    setInitialCursorVariant(animateCursorVariant);
    setAnimateCursorVariant(variant);
  };

  return (
    <CursorContext.Provider
      value={{
        initialCursorVariant,
        setInitialCursorVariant,
        animateCursorVariant,
        setAnimateCursorVariant,
        animateCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}; 