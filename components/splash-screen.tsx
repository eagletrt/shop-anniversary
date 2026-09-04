'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Logo_dark from '@/public/logo_dark.svg';
import Logo_light from '@/public/logo_light.svg';

interface SplashScreenProps {
  minimumLoadTimeMs?: number;
  finishDelay?: number;
  onComplete?: () => void;
  logoSize?: number;
}

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--primary) 0%, transparent); }
    50% { box-shadow: 0 0 0 10px color-mix(in oklch, var(--primary) 10%, transparent); }
    100% { box-shadow: 0 0 0 20px color-mix(in oklch, var(--primary) 0%, transparent); }
  }
  
  .splash-screen-exit {
    animation: fadeOut 0.5s ease-in-out forwards;
  }
  
  .splash-screen-enter {
    animation: fadeIn 0.5s ease-in-out forwards;
  }
  
  .logo-container {
    animation: scaleIn 0.5s ease-out forwards;
  }
  
  .logo-pulse {
    animation: pulse 1.5s ease-in-out 0.5s infinite;
  }
`;

export default function SplashScreen({
  minimumLoadTimeMs = 2500,
  finishDelay = 300,
  onComplete,
  logoSize = 120,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Ensure the splash screen is visible immediately and prevent scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      // Clean up when unmounted
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = '';
        onComplete?.();
      }, finishDelay);
    }, minimumLoadTimeMs);

    return () => clearTimeout(timer);
  }, [minimumLoadTimeMs, finishDelay, onComplete]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="bg-background fixed inset-0 z-[9999] flex items-center justify-center">
        <div style={{ width: logoSize, height: logoSize }}></div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      {isVisible && (
        <div
          className={`bg-background fixed inset-0 z-[9999] flex items-center justify-center ${
            !isVisible ? 'splash-screen-exit' : 'splash-screen-enter'
          }`}
        >
          <div className="logo-container">
            <LogoAnimation size={logoSize} />
          </div>
        </div>
      )}
    </>
  );
}

function LogoAnimation({ size = 120 }: { size?: number }) {
  const { theme, resolvedTheme } = useTheme();

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  // Use the appropriate logo based on the theme
  const logoSrc = currentTheme === 'dark' ? Logo_dark : Logo_light;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div style={{ animation: 'fadeIn 0.5s ease-out', width: '100%', height: '100%', position: 'relative' }}>
        <Image src={logoSrc} alt="Logo" fill className="object-contain" priority />
      </div>

      {/* Pulsing effect using theme colors */}
      <div className="absolute inset-0 rounded-full logo-pulse" />
    </div>
  );
}
