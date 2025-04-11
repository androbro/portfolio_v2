"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { ProjectItemCard } from "./ProjectItemCard";

interface ProjectsClientProps {
	projects: ProjectItem[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Create scroll-linked animations for the section title
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]); // Simplified range
	const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]); // Simplified range

	const handleExpand = (index: number) => {
		setExpandedIndex(index === expandedIndex ? null : index);
	};

	return (
		<div id="projects" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
					<SectionTitle title="My Projects" />

					{/* Project Grid */}
					<motion.div
						className="relative"
						layout
						transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
					>
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr"
							layout
							transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
						>
							{projects.map((project, index) => (
								<ProjectItemCard
									key={project.title}
									project={project}
									index={index}
									scrollYProgress={scrollYProgress}
									isExpanded={expandedIndex === index}
									onExpand={() => handleExpand(index)}
									layoutId={`project-${index}`}
								/>
							))}
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
