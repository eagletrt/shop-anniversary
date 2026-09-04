"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo_dark from "@/public/logo_dark.svg";

interface SplashScreenProps {
  minimumLoadTimeMs?: number;
  finishDelay?: number;
  onComplete?: () => void;
  logoSize?: number;
}

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
    document.body.style.overflow = "hidden";

    return () => {
      // Clean up when unmounted
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete?.();
      }, finishDelay);
    }, minimumLoadTimeMs);

    return () => clearTimeout(timer);
  }, [minimumLoadTimeMs, finishDelay, onComplete]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background">
        <div style={{ width: logoSize, height: logoSize }}></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <LogoAnimation size={logoSize} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LogoAnimation({ size = 120 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={Logo_dark}
          alt="Logo"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Pulsing effect using theme colors */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ boxShadow: "0 0 0 0 hsla(var(--primary), 0)" }}
        animate={{
          boxShadow: [
            "0 0 0 0 hsla(var(--primary), 0)",
            "0 0 0 10px hsla(var(--primary), 0.1)",
            "0 0 0 20px hsla(var(--primary), 0)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          times: [0, 0.5, 1],
          delay: 0.5,
        }}
      />
    </div>
  );
}
