"use client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useScroll } from "motion/react";
import { useRef } from "react";
import { CategoryItem } from "./CategoryItem";

type Tech = {
	name: string;
	icon?: SanityImageSource;
	iconUrl?: string;
};
interface CategorySectionProps {
	visibleCategories: [string, Tech[]][];
}

export function CategorySection({ visibleCategories }: CategorySectionProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	// Set up scroll animation
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	return (
		<div className="w-full" ref={sectionRef}>
			{visibleCategories.map(([category, techs], categoryIndex) => (
				<CategoryItem
					key={category}
					category={category}
					techs={techs}
					categoryIndex={categoryIndex}
					scrollYProgress={scrollYProgress}
				/>
			))}
		</div>
	);
}
