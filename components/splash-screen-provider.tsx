'use client';

import { usePathname } from 'next/navigation';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import SplashScreen from './splash-screen';

type SplashScreenContextType = {
  hasSeenSplashScreen: boolean;
  setHasSeenSplashScreen: (value: boolean) => void;
  resetSplashScreen: () => void;
};

const SplashScreenContext = createContext<SplashScreenContextType>({
  hasSeenSplashScreen: false,
  setHasSeenSplashScreen: () => {},
  resetSplashScreen: () => {},
});

export const useSplashScreen = () => useContext(SplashScreenContext);

export function SplashScreenProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplashScreen, setHasSeenSplashScreen] = useState(false);
  const pathname = usePathname();

  const resetSplashScreen = () => {
    sessionStorage.removeItem('hasSeenSplashScreen');
    setShowSplash(true);
    setHasSeenSplashScreen(false);
  };

  useEffect(() => {
    const hasSeenInSession = sessionStorage.getItem('hasSeenSplashScreen');

    if (!hasSeenInSession) {
      setShowSplash(true);
      setHasSeenSplashScreen(false);
      sessionStorage.setItem('hasSeenSplashScreen', 'true');
    } else {
      setShowSplash(false);
      setHasSeenSplashScreen(true);
    }
  }, []);

  return (
    <SplashScreenContext.Provider
      value={{
        hasSeenSplashScreen,
        setHasSeenSplashScreen,
        resetSplashScreen,
      }}
    >
      {/* Render children normally without display none, so SEO works and layout is present */}
      <div
        className={`transition-opacity duration-700 ease-in-out ${!showSplash ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>

      {showSplash && (
        <SplashScreen
          onComplete={() => {
            setShowSplash(false);
            setHasSeenSplashScreen(true);
          }}
        />
      )}
    </SplashScreenContext.Provider>
  );
}
