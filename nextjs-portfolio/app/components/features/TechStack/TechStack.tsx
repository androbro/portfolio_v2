"use client";

import { AsterixIcon } from "@/app/assets/icons";
import { client } from "@/app/sanity/client";
import { motion } from "motion/react";
import type { SanityDocument } from "next-sanity";
import { useEffect, useRef, useState } from "react";
import { CategorySection } from "./CategorySection";
import { useTechStackToggle } from "./useTechStackToggle";

const DEFAULT_VISIBLE_CATEGORIES = ["frontend", "backend", "database"];

const TECHSTACK_QUERY = `*[_type == "techStack"]`;
const options = { next: { revalidate: 30 } };

// Type for the transformed tech stack data
type TechStackDataType = Record<string, { name: string; iconUrl: string }[]>;

export async function TechStack() {
	const techStackItems = await client.fetch<SanityDocument[]>(
		TECHSTACK_QUERY,
		{},
		options,
	);

	// Transform Sanity data to match the expected format
	const transformedTechStack: TechStackDataType = {};

	// Process the Sanity data into the required format
	for (const item of techStackItems) {
		// Make sure the category exists in our object
		if (!transformedTechStack[item.category]) {
			transformedTechStack[item.category] = [];
		}

		// Add the tech item to the appropriate category
		transformedTechStack[item.category].push({
			name: item.name,
			iconUrl: item.iconUrl || `/icons/${item.name.toLowerCase()}.svg`, // Fallback
		});
	}

	// Get all category names from the transformed data
	const allCategories = Object.keys(transformedTechStack);

	// Client-side component
	return (
		<TechStackClient
			techStackData={transformedTechStack}
			allCategories={allCategories}
		/>
	);
}

// Client-side component to handle interactive elements
function TechStackClient({
	techStackData,
	allCategories,
}: {
	techStackData: TechStackDataType;
	allCategories: string[];
}) {
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
				<div className="flex items-center gap-4 mb-16">
					<motion.div
						className="text-accent"
						animate={{
							rotate: 360,
						}}
						transition={{
							duration: 6,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					>
						<AsterixIcon className="w-8 h-8" />
					</motion.div>
					<h2 className="text-2xl uppercase">My Stack</h2>
				</div>

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
