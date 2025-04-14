"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook that returns true if the viewport matches the provided media query
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		// Create a media query list
		const mediaQuery = window.matchMedia(query);

		// Set the initial value
		setMatches(mediaQuery.matches);

		// Define the change handler
		const handleChange = (event: MediaQueryListEvent): void => {
			setMatches(event.matches);
		};

		// Add the event listener
		mediaQuery.addEventListener("change", handleChange);

		// Clean up
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [query]);

	return matches;
}
