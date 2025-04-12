"use client";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { client } from "../../../sanity/client";
import { TechIcon } from "./TechIcon";

type Tech = {
	name: string;
	icon?: SanityImageSource;
	iconUrl?: string;
};

type TechStackData = Record<string, Tech[]>;

// Set up Sanity image builder
const { projectId = "", dataset = "" } = client.config();
const urlFor = (source: SanityImageSource): string | null | undefined => {
	if (!source) return null;
	return imageUrlBuilder({ projectId, dataset }).image(source).url();
};

interface CategorySectionProps {
	visibleCategories: [string, Tech[]][];
}

// Max number of categories we'll pre-calculate animations for
const MAX_CATEGORIES = 10;

export function CategorySection({ visibleCategories }: CategorySectionProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	// Set up scroll animation
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Pre-calculate animations for a fixed number of possible categories
	// This ensures hooks are called in the same order every render
	const categoryAnimations = Array.from({ length: MAX_CATEGORIES }).map(
		(_, index) => {
			const opacity = useTransform(
				scrollYProgress,
				[0.05 * index, 0.05 * index + 0.1, 0.05 * index + 0.2],
				[0, 0.5, 1],
			);

			const y = useTransform(
				scrollYProgress,
				[0.05 * index, 0.05 * index + 0.1, 0.05 * index + 0.2],
				[50, 25, 0],
			);

			return { opacity, y };
		},
	);

	return (
		<div className="w-full" ref={sectionRef}>
			{visibleCategories.map(([category, techs], categoryIndex) => {
				// Use pre-calculated animations based on category index
				// If more categories than pre-calculated, use the last animation
				const animationIndex = Math.min(categoryIndex, MAX_CATEGORIES - 1);
				const { opacity, y } = categoryAnimations[animationIndex];

				return (
					<motion.div
						key={category}
						className="mb-20"
						style={{
							opacity,
							y,
						}}
					>
						<div className="flex flex-col md:flex-row">
							{/* Category heading */}
							<div className="md:w-1/3 mb-8 md:mb-0">
								<h3 className="text-5xl font-bold text-gray-400 uppercase sticky top-20">
									{category}
								</h3>
							</div>

							{/* Technologies grid */}
							<div className="md:w-2/3">
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
									{techs.map((tech, techIndex) => {
										// Stagger animations for tech items within each category
										const delayFactor = 0.05;
										const techDelay = techIndex * delayFactor;

										return (
											<motion.div
												key={`${category}-${tech.name}`}
												className="flex flex-row items-center gap-4 hover:scale-105 transition-transform"
												initial={{ opacity: 0, y: 20 }}
												animate={{
													opacity: 1,
													y: 0,
													transition: {
														delay: techDelay,
														duration: 0.3,
													},
												}}
											>
												<TechIcon tech={tech} urlFor={urlFor} />
												<span className="text-lg">{tech.name}</span>
											</motion.div>
										);
									})}
								</div>
							</div>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
