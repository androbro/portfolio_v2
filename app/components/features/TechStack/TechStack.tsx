"use client";

import { techStackData } from "@/app/assets/content/TechStackData";
import { AsterixIcon } from "@/app/assets/icons";
import { AnimatePresence, animate, motion } from "motion/react";
import { useRef, useState } from "react";

// --- Constants ---
const DEFAULT_VISIBLE_CATEGORIES = ["frontend", "backend", "database"];
const SCROLL_OFFSET = 100; // px - Offset from top when scrolling up

export function TechStack() {
	const [showAll, setShowAll] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const allCategoryKeys = Object.keys(techStackData);
	const totalCategoriesCount = allCategoryKeys.length;

	// Simplified scroll animation function
	const smoothScrollTo = (yPosition: number) => {
		console.log("smoothScrollTo", yPosition);
		animate(window.scrollY, yPosition, {
			duration: 0.5, // Simple, consistent duration
			ease: "easeIn",
			onUpdate: (latest) => window.scrollTo(0, latest),
		});
	};

	const handleShowToggle = () => {
		if (showAll && sectionRef.current) {
			// --- Show Less ---
			// Scroll up immediately
			smoothScrollTo(sectionRef.current.offsetTop - SCROLL_OFFSET);
			// Then update state to trigger exit animations
			setShowAll(false);
		} else {
			// --- Show More ---
			// Just update state. Scroll down will be handled by useEffect after render.
			setShowAll(true);
		}
	};

	// Function to render a category section
	const renderCategory = (
		category: string,
		techs: {
			name: string;
			iconUrl: string;
		}[],
		index: number,
	) => {
		return (
			<motion.div
				key={category}
				className="mb-20"
				initial={{ opacity: 0, y: 50 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.5,
						delay: index * 0.2, // Entry delay remains top-to-bottom
						ease: "easeOut",
					},
				}}
				exit={{
					opacity: 0,
					y: -50,
					transition: {
						duration: 0.5,
						// Reverse the delay calculation for exit
						delay: (totalCategoriesCount - 1 - index) * 0.15,
						ease: "easeIn",
					},
				}}
			>
				<div className="flex flex-col md:flex-row">
					{/* Text on the left */}
					<div className="md:w-1/3 mb-8 md:mb-0">
						<h3 className="text-5xl font-bold text-gray-400 uppercase sticky top-20">{category}</h3>
					</div>

					{/* Icons on the right */}
					<div className="md:w-2/3">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{techs.map((tech, techIndex) => (
								<motion.div
									key={`${category}-${tech.name}`}
									className="flex flex-row items-center gap-4"
									initial={{
										opacity: 0,
										x: 50,
									}}
									whileInView={{
										opacity: 1,
										x: 0,
										transition: {
											duration: 0.5,
											delay: techIndex * 0.1,
										},
									}}
									viewport={{
										once: true,
									}}
									whileHover={{
										scale: 1.05,
									}}
								>
									<img
										src={tech.iconUrl}
										alt={`${tech.name} logo`}
										className="w-16 h-16 object-contain shrink-0"
									/>
									<span className="text-lg">{tech.name}</span>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		);
	};

	// Get visible categories based on showAll state
	const getVisibleCategories = () => {
		const entries = Object.entries(techStackData);

		if (showAll) {
			return entries;
		}
		// Use the constant for default categories
		return entries.filter(([category]) => DEFAULT_VISIBLE_CATEGORIES.includes(category));
	};

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
					{/* Wrap list with AnimatePresence */}
					<AnimatePresence initial={false}>
						{getVisibleCategories().map(([category, techs], index) =>
							renderCategory(category, techs, index),
						)}
					</AnimatePresence>

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
