"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { CategorySection } from "./CategorySection";
import { useTechStackToggle } from "./useTechStackToggle";
// Constants
const DEFAULT_VISIBLE_CATEGORIES = ["frontend", "backend", "database"];

// Type for the tech stack data
export type TechStackDataType = Record<
	string,
	{ name: string; iconUrl: string }[]
>;

interface TechStackClientProps {
	techStackData: TechStackDataType;
	allCategories: string[];
}

export function TechStackClient({
	techStackData,
	allCategories,
}: TechStackClientProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [sectionElement, setSectionElement] = useState<HTMLElement | null>(
		null,
	);

	// Update element reference when ref changes
	useEffect(() => {
		setSectionElement(sectionRef.current);
	}, []);

	const { showAll, handleShowToggle, getVisibleCategories } =
		useTechStackToggle({
			sectionElement,
			defaultCategories: DEFAULT_VISIBLE_CATEGORIES,
			allCategories,
			techStackData,
		});

	// Get current visible categories
	const visibleCategories = getVisibleCategories();

	return (
		<div
			id="skills"
			ref={sectionRef}
			className="flex flex-col items-center justify-center py-20 w-full overflow-hidden"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl w-full overflow-visible">
				<SectionTitle title="My Stack" />

				<div className="flex flex-col overflow-hidden">
					{/* CategorySection handles rendering */}
					<CategorySection
						visibleCategories={visibleCategories}
						techStackData={techStackData}
					/>

					{/* Show More/Less button */}
					<button
						type="button"
						ref={buttonRef}
						onClick={handleShowToggle}
						className="self-center mt-8 px-6 py-2 bg-accent text-black font-light hover:bg-white/90 transition-colors"
					>
						{showAll ? "Show Less" : "Show More"}
					</button>
				</div>
			</div>
		</div>
	);
}
