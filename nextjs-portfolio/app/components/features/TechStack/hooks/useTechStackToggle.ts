import { useCallback, useState } from "react";
import type { TechStackDataType } from "../TechStackClient";

// Constants
const PREFERRED_CATEGORY_ORDER = [
	"frontend",
	"backend",
	"database",
	"devops-tools",
	"mobile",
	"other",
];

// Types
type TechData = {
	name: string;
	iconUrl: string;
}[];

type CategoryEntry = [string, TechData];

interface UseTechStackToggleProps {
	sectionElement: HTMLElement | null;
	defaultCategories: string[];
	allCategories: string[];
	techStackData: TechStackDataType;
}

export function useTechStackToggle({ defaultCategories, techStackData }: UseTechStackToggleProps) {
	const [showAll, setShowAll] = useState(false);

	// Toggle between showing all or default categories
	const handleShowToggle = useCallback(() => {
		// Simply toggle the state without any scrolling
		setShowAll((prevState) => !prevState);
	}, []);

	// Get default categories as entries
	const getDefaultCategories = useCallback((): CategoryEntry[] => {
		return defaultCategories
			.filter((category) => techStackData[category])
			.map((category) => [category, techStackData[category]]);
	}, [defaultCategories, techStackData]);

	// Compare categories based on preferred order
	const compareCategories = useCallback((catA: string, catB: string): number => {
		const indexA = PREFERRED_CATEGORY_ORDER.indexOf(catA);
		const indexB = PREFERRED_CATEGORY_ORDER.indexOf(catB);

		// If both categories are in preferred order, sort by position
		if (indexA !== -1 && indexB !== -1) {
			return indexA - indexB;
		}

		// If only one category is in preferred order, it comes first
		if (indexA !== -1) return -1;
		if (indexB !== -1) return 1;

		// Otherwise, sort alphabetically
		return catA.localeCompare(catB);
	}, []);

	// Get all categories as sorted entries
	const getAllCategories = useCallback((): CategoryEntry[] => {
		const entries = Object.entries(techStackData) as CategoryEntry[];
		return entries.sort(([catA], [catB]) => compareCategories(catA, catB));
	}, [techStackData, compareCategories]);

	// Get visible categories based on showAll state
	const getVisibleCategories = useCallback((): CategoryEntry[] => {
		return showAll ? getAllCategories() : getDefaultCategories();
	}, [showAll, getDefaultCategories, getAllCategories]);

	return {
		showAll,
		handleShowToggle,
		getVisibleCategories,
	};
}
