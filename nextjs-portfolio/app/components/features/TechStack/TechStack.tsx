"use client";

import { techStackData } from "@/app/assets/content/TechStackData";
import { AsterixIcon } from "@/app/assets/icons";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CategorySection } from "./CategorySection";
import { useTechStackToggle } from "./useTechStackToggle";

// Moved constants to component file
const DEFAULT_VISIBLE_CATEGORIES = ["frontend", "backend", "database"];

export function TechStack() {
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
			allCategories: Object.keys(techStackData),
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
