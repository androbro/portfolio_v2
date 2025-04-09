"use client";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { client } from "../../../sanity/client";

type Tech = {
	name: string;
	icon?: SanityImageSource;
	iconUrl?: string;
};

type TechStackData = Record<string, Tech[]>;

const { projectId = "", dataset = "" } = client.config();

const urlFor = (source: SanityImageSource) =>
	source ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

interface CategorySectionProps {
	visibleCategories: [string, Tech[]][];
	techStackData: TechStackData;
}

export function CategorySection({ visibleCategories }: CategorySectionProps) {
	const totalCategoriesCount = useMemo(
		() => visibleCategories.length,
		[visibleCategories],
	);

	// Function to render a category section
	const renderCategory = (category: string, techs: Tech[], index: number) => {
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
						<h3 className="text-5xl font-bold text-gray-400 uppercase sticky top-20">
							{category}
						</h3>
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
										src={
											tech.iconUrl
												? tech.iconUrl.startsWith("http")
													? tech.iconUrl
													: tech.iconUrl.includes(".svg")
														? tech.iconUrl.startsWith("/icons/")
															? tech.iconUrl
															: `/icons/${tech.iconUrl.replace("icons/", "")}`
														: `/icons/${tech.iconUrl.replace("icons/", "")}.svg`
												: tech.icon
													? urlFor(tech.icon)?.width(64).height(64).url()
													: undefined
										}
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

	return (
		<AnimatePresence initial={false}>
			{visibleCategories.map(([category, techs], index) =>
				renderCategory(category, techs, index),
			)}
		</AnimatePresence>
	);
}
