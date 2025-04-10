"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useNavigationEvents() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When pathname or searchParams change, it means navigation has started
    setIsNavigating(true);
    
    // Set a small timeout to simulate the loading state
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return isNavigating;
} 