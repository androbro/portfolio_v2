"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { ProjectItemCard } from "./ProjectItemCard";

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
					<SectionTitle title="My Projects" />

					{/* Project Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{projects.map((project, index) => (
							<ProjectItemCard
								key={project.title}
								project={project}
								index={index}
								scrollYProgress={scrollYProgress}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
