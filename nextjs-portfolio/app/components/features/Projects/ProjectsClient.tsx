"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SectionTitle } from "../common/SectionTitle";
import { ProjectItemCard, ProjectMobileCard } from "./components";

interface ProjectsClientProps {
	projects: ProjectItem[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const isMediumScreen = useMediaQuery("(min-width: 1024px)");

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const handleExpand = (index: number) => {
		setExpandedIndex(index === expandedIndex ? null : index);
	};

	return (
		<div id="projects" className="flex items-center justify-center py-10 sm:py-20">
			<div className="content-container w-full md:w-4xl lg:w-6xl xl:w-7xl px-4 sm:px-6 md:px-8">
				<div className="relative">
					<SectionTitle title="My Projects" />

					{/* Project Grid */}
					<motion.div
						className="relative"
						layout
						transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
					>
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 auto-rows-fr"
							layout
							transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
						>
							{projects.map((project, index) =>
								isMediumScreen ? (
									<ProjectItemCard
										key={project.title}
										project={project}
										index={index}
										scrollYProgress={scrollYProgress}
										isExpanded={expandedIndex === index}
										onExpand={() => handleExpand(index)}
										layoutId={`project-${index}`}
									/>
								) : (
									<ProjectMobileCard
										key={project.title}
										project={project}
										index={index}
										scrollYProgress={scrollYProgress}
									/>
								),
							)}
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
