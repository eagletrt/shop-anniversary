"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import SplashScreen from "./splash-screen";

// Create context to track splash screen state across the app
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

export function SplashScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [hasSeenSplashScreen, setHasSeenSplashScreen] = useState(false);
  const pathname = usePathname();

  // Function to reset the splash screen
  const resetSplashScreen = () => {
    sessionStorage.removeItem("hasSeenSplashScreen");
    setContentVisible(false);
    setShowSplash(true);
    setSplashComplete(false);
    setHasSeenSplashScreen(false);
  };

  useEffect(() => {
    // Check if this is a new window/tab session
    const hasSeenInSession = sessionStorage.getItem("hasSeenSplashScreen");

    if (!hasSeenInSession) {
      // First visit in this session - show splash screen
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSplash(true);
      setSplashComplete(false);
      setContentVisible(false);
      setHasSeenSplashScreen(false);
      // Mark that we've shown the splash screen in this session
      sessionStorage.setItem("hasSeenSplashScreen", "true");
    } else {
      // Already seen in this session
      setSplashComplete(true);
      setContentVisible(true);
      setHasSeenSplashScreen(true);
    }
  }, []);

  // This effect runs when the pathname changes (page navigation)
  useEffect(() => {
    // The splash screen state is maintained during navigation
  }, [pathname]);

  // Effect to handle the fade-in transition of content after splash screen completes
  useEffect(() => {
    if (splashComplete && !contentVisible) {
      // Add a slight delay before showing content for a smoother transition
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [splashComplete, contentVisible]);

  return (
    <SplashScreenContext.Provider
      value={{
        hasSeenSplashScreen,
        setHasSeenSplashScreen,
        resetSplashScreen,
      }}
    >
      {/* Render children with opacity transition */}
      <div
        className={`transition-opacity duration-700 ease-in-out ${contentVisible ? "opacity-100" : "opacity-0"}`}
        style={{ display: splashComplete ? "block" : "none" }}
      >
        {children}
      </div>

      {/* Show splash screen only when needed */}
      {showSplash && (
        <SplashScreen
          onComplete={() => {
            setShowSplash(false);
            setSplashComplete(true);
            setHasSeenSplashScreen(true);
          }}
        />
      )}
    </SplashScreenContext.Provider>
  );
}
