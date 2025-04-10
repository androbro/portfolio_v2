"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigationEvents } from "../../hooks/useNavigationEvents";

export function LoadingScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const isNavigating = useNavigationEvents();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white text-lg font-medium">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 