import { useCallback, useState } from "react";
import type { TechStackDataType } from "./TechStackClient";

// Constants
const SCROLL_OFFSET = 100; // px - Offset from top when scrolling up

// Types
type TechData = {
	name: string;
	iconUrl: string;
}[];

interface UseTechStackToggleProps {
	sectionElement: HTMLElement | null;
	defaultCategories: string[];
	allCategories: string[];
	techStackData: TechStackDataType;
}

export function useTechStackToggle({
	sectionElement,
	defaultCategories,
	allCategories,
	techStackData,
}: UseTechStackToggleProps) {
	const [showAll, setShowAll] = useState(false);

	// Simple scroll function without animation
	const scrollTo = useCallback((yPosition: number) => {
		window.scrollTo({
			top: yPosition,
			behavior: "auto",
		});
	}, []);

	const handleShowToggle = useCallback(() => {
		if (showAll && sectionElement) {
			// --- Show Less ---
			// First update state to show fewer categories
			setShowAll(false);
			// Then scroll up
			setTimeout(() => {
				if (sectionElement) {
					scrollTo(sectionElement.offsetTop - SCROLL_OFFSET);
				}
			}, 10);
		} else {
			// --- Show More ---
			setShowAll(true);
		}
	}, [showAll, sectionElement, scrollTo]);

	// Get visible categories based on showAll state
	const getVisibleCategories = useCallback(() => {
		const entries = Object.entries(techStackData) as [string, TechData][];

		if (showAll) {
			// Define a preferred category order
			const preferredOrder = [
				"frontend",
				"backend",
				"database",
				"devops-tools",
				"other",
				"mobile",
			];

			// Sort entries based on the preferred order
			return entries.sort(([catA], [catB]) => {
				const indexA = preferredOrder.indexOf(catA);
				const indexB = preferredOrder.indexOf(catB);

				// If both categories are in preferredOrder, sort by their position
				if (indexA !== -1 && indexB !== -1) {
					return indexA - indexB;
				}

				// If only catA is in preferredOrder, it comes first
				if (indexA !== -1) return -1;

				// If only catB is in preferredOrder, it comes first
				if (indexB !== -1) return 1;

				// If neither is in preferredOrder, maintain alphabetical order
				return catA.localeCompare(catB);
			});
		}

		// Use the constant for default categories, maintaining their order
		return defaultCategories
			.filter((category) => techStackData[category])
			.map((category) => [category, techStackData[category]]) as [
			string,
			TechData,
		][];
	}, [showAll, defaultCategories, techStackData]);

	return {
		showAll,
		handleShowToggle,
		getVisibleCategories,
	};
}
