"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { CategorySection } from "./components/CategorySection";
import { useTechStackToggle } from "./hooks/useTechStackToggle";

// Constants
const DEFAULT_VISIBLE_CATEGORIES = ["frontend", "backend", "database"];

// Type for the tech stack data
export type TechStackDataType = Record<string, { name: string; iconUrl: string }[]>;

interface TechStackClientProps {
	techStackData: TechStackDataType;
	allCategories: string[];
}

export function TechStackClient({ techStackData, allCategories }: TechStackClientProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [showExitAnimation, setShowExitAnimation] = useState(false);

	const { showAll, handleShowToggle, getVisibleCategories } = useTechStackToggle({
		sectionElement: null, // Removed sectionElement since we don't use scroll behavior
		defaultCategories: DEFAULT_VISIBLE_CATEGORIES,
		allCategories,
		techStackData,
	});

	// Get current visible categories - memoize to avoid recalculation on every render
	const visibleCategories = getVisibleCategories();

	// Split categories into default and expanded for rendering order
	const defaultCategories = visibleCategories.filter(([category]) =>
		DEFAULT_VISIBLE_CATEGORIES.includes(category),
	);

	const expandedCategories = visibleCategories.filter(
		([category]) => !DEFAULT_VISIBLE_CATEGORIES.includes(category),
	);

	// Handle toggle with sequenced animations
	const handleSequencedToggle = () => {
		if (showAll) {
			// When hiding, set exit animation flag before toggle
			setShowExitAnimation(true);
			setTimeout(() => {
				handleShowToggle();
				// Reset exit animation flag after a delay
				setTimeout(() => {
					setShowExitAnimation(false);
				}, 600);
			}, 50);
		} else {
			// When showing more, just toggle directly
			handleShowToggle();
		}
	};

	// Create show more/less button component
	const showMoreButton = (
		<motion.button
			type="button"
			ref={buttonRef}
			onClick={handleSequencedToggle}
			className="self-center px-8 py-3 bg-accent text-black font-light hover:bg-white/90 transition-colors z-10 mt-10"
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{
				opacity: 1,
				scale: 1,
				y: [0, -5, 0],
				transition: {
					y: {
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
						duration: 1.5,
						ease: "easeInOut",
					},
				},
			}}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			{showAll ? "Show Less" : "Show More"}
		</motion.button>
	);

	return (
		<div
			id="tech-stack"
			ref={sectionRef}
			className="flex flex-col items-center justify-center py-20 w-full overflow-hidden"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl w-full overflow-visible">
				<SectionTitle title="My Stack" />

				<div className="flex flex-col overflow-hidden">
					{/* Default categories always visible */}
					{defaultCategories.map(([category, techs]) => (
						<CategorySection
							key={category}
							category={category}
							techs={techs}
							isAnimated={false}
							exitAnimation={showExitAnimation && !DEFAULT_VISIBLE_CATEGORIES.includes(category)}
						/>
					))}

					{/* Expanded categories with animations */}
					<AnimatePresence mode="wait">
						{expandedCategories.map(([category, techs]) => (
							<motion.div
								key={category}
								initial={{ opacity: 0, y: 40 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										type: "spring",
										stiffness: 100,
										damping: 15,
									},
								}}
								exit={{
									opacity: 0,
									y: 20,
									transition: {
										duration: 0.3,
									},
								}}
							>
								<CategorySection category={category} techs={techs} isAnimated={true} />
							</motion.div>
						))}
					</AnimatePresence>

					{/* Show more/less button */}
					<div className="flex justify-center">{showMoreButton}</div>
				</div>
			</div>
		</div>
	);
}
