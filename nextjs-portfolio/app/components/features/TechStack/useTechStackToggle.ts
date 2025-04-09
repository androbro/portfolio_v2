import { techStackData } from "@/app/assets/content/TechStackData";
import { animate } from "motion/react";
import { useCallback, useState } from "react";

// Constants
const SCROLL_OFFSET = 100; // px - Offset from top when scrolling up

interface UseTechStackToggleProps {
	sectionElement: HTMLElement | null;
	defaultCategories: string[];
	allCategories: string[];
}

type TechData = {
	name: string;
	iconUrl: string;
}[];

type TechStackDataType = Record<string, TechData>;

export function useTechStackToggle({
	sectionElement,
	defaultCategories,
	allCategories,
}: UseTechStackToggleProps) {
	const [showAll, setShowAll] = useState(false);

	// Simplified scroll animation function
	const smoothScrollTo = useCallback((yPosition: number) => {
		animate(window.scrollY, yPosition, {
			duration: 0.5, // Simple, consistent duration
			ease: "easeIn",
			onUpdate: (latest) => window.scrollTo(0, latest),
		});
	}, []);

	const handleShowToggle = useCallback(() => {
		if (showAll && sectionElement) {
			// --- Show Less ---
			// Scroll up immediately
			smoothScrollTo(sectionElement.offsetTop - SCROLL_OFFSET);
			// Then update state to trigger exit animations
			setShowAll(false);
		} else {
			// --- Show More ---
			// Just update state. Scroll down will be handled by useEffect after render.
			setShowAll(true);
		}
	}, [showAll, sectionElement, smoothScrollTo]);

	// Get visible categories based on showAll state
	const getVisibleCategories = useCallback(() => {
		const entries = Object.entries(techStackData) as [string, TechData][];

		if (showAll) {
			return entries;
		}
		// Use the constant for default categories
		return entries.filter(([category]) => defaultCategories.includes(category));
	}, [showAll, defaultCategories]);

	return {
		showAll,
		handleShowToggle,
		getVisibleCategories,
	};
}
