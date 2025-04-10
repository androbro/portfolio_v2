"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function useNavigationEvents() {
	const [isNavigating, setIsNavigating] = useState(false);
	const pathname = usePathname();
	const prevPathRef = useRef(pathname);

	useEffect(() => {
		// Check if pathname changed
		if (prevPathRef.current !== pathname) {
			setIsNavigating(true);
			prevPathRef.current = pathname;

			// Set a small timeout to simulate the loading state
			const timer = setTimeout(() => {
				setIsNavigating(false);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [pathname]); // Keep pathname in deps because we need to run the effect when it changes

	return isNavigating;
}
