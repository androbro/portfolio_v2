"use client";

import { AsterixIcon } from "@/app/assets/icons";
import type { ProjectItem } from "@/app/sanity/lib/transforms"; // Use the centralized type
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ProjectItemCard } from "./ProjectItemCard"; // Import the new component

// Type definition for project data is removed, using imported type
// export type ProjectItem = {
// 	title: string;
// 	description: string;
// 	year: string;
// 	image?: string;
// 	url?: string;
// 	repositoryUrl?: string;
// 	tags?: string[];
// };

interface ProjectsClientProps {
	projects: ProjectItem[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Create scroll-linked animations for the section title
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]); // Simplified range
	const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]); // Simplified range

	// Removed individual item animation logic (itemOpacity, itemY)

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="flex items-center justify-center py-20"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
					{/* Section Header */}
					<div className="flex items-center gap-4 mb-16">
						{/* Asterix Icon */}
						<motion.div
							className="text-accent"
							animate={{ rotate: 360 }}
							transition={{
								duration: 6,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
						>
							<AsterixIcon className="w-8 h-8" />
						</motion.div>
						{/* Section Title */}
						<motion.h2
							className="text-2xl uppercase"
							style={{
								opacity: titleOpacity,
								y: titleY,
							}}
						>
							My Projects
						</motion.h2>
					</div>

					{/* Project List */}
					<div className="space-y-12">
						{projects.map((project, index) => (
							// Render the extracted component
							<ProjectItemCard
								key={project.title} // Key is still needed here for map
								project={project}
								index={index}
								scrollYProgress={scrollYProgress} // Pass down scroll progress
							/>
							// Removed the large block of JSX that is now in ProjectItemCard
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
