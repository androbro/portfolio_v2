"use client";

import { motion } from "motion/react";
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
	const sectionRef = useRef<HTMLElement>(null);
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

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="flex flex-col items-center justify-center py-20"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl w-full">
				<SectionTitle title="My Stack" />

				<div className="flex flex-col">
					{/* CategorySection handles the animation and rendering */}
					<CategorySection
						visibleCategories={getVisibleCategories()}
						techStackData={techStackData}
					/>

					{/* Show More/Less button */}
					<motion.button
						ref={buttonRef}
						onClick={handleShowToggle}
						className="self-center mt-8 px-6 py-2 bg-accent text-black font-light hover:bg-white/90 transition-colors"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{showAll ? "Show Less" : "Show More"}
					</motion.button>
				</div>
			</div>
		</section>
	);
}
