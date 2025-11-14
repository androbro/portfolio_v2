"use client";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { client } from "../../../../sanity/client";
import { TechIcon } from "./TechIcon";

export type Tech = {
	name: string;
	icon?: SanityImageSource;
	iconUrl?: string;
};

// Set up Sanity image builder
const { projectId = "", dataset = "" } = client.config();
const urlFor = (source: SanityImageSource): string | null | undefined => {
	if (!source) return null;
	return imageUrlBuilder({ projectId, dataset }).image(source).url();
};

interface CategorySectionProps {
	category: string;
	techs: Tech[];
	isAnimated?: boolean;
	exitAnimation?: boolean;
}

export function CategorySection({
	category,
	techs,
	isAnimated = false,
	exitAnimation = false,
}: CategorySectionProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	// Set up scroll animation if this is a default (non-animated) category
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	// Calculate transforms for scroll-based animations
	const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 0.5, 1]);

	const y = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [40, 20, 0]);

	// Return the category section with proper animations
	return (
		<motion.div
			ref={containerRef}
			className="mb-20"
			// For non-animated (default) categories, use scroll-based animations
			// For animated (expanded) categories, the parent handles the animation
			style={!isAnimated ? { opacity, y } : undefined}
		>
			<div className="flex flex-col md:flex-row">
				{/* Category heading */}
				<div className="md:w-1/3 mb-8 md:mb-0">
					<h3 className="text-5xl font-bold text-gray-400 uppercase sticky top-20">{category}</h3>
				</div>

				{/* Technologies grid */}
				<div className="md:w-2/3">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{techs.map((tech, techIndex) => {
							// If category is animated (expanded), stagger the tech items
							const delay = isAnimated ? techIndex * 0.05 + 0.2 : 0;

							return (
								<motion.div
									key={`${category}-${tech.name}`}
									className="flex flex-row items-center gap-4"
									initial={isAnimated ? { opacity: 0, y: 20, scale: 0.9 } : undefined}
									animate={
										isAnimated
											? {
													opacity: 1,
													y: 0,
													scale: 1,
													transition: {
														delay,
														duration: 0.4,
														type: "spring",
														stiffness: 200,
													},
												}
											: undefined
									}
									whileHover={{
										scale: 1.1,
										y: -5,
										transition: { duration: 0.2 },
									}}
								>
									<TechIcon tech={tech} urlFor={urlFor} />
									<span className="text-lg font-medium">{tech.name}</span>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</motion.div>
	);
}
