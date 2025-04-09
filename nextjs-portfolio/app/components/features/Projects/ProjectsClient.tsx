"use client";

import { AsterixIcon } from "@/app/assets/icons";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Type definition for project data
export type ProjectItem = {
	title: string;
	description: string;
	year: string;
	image?: string;
	url?: string;
	repositoryUrl?: string;
	tags?: string[];
};

interface ProjectsClientProps {
	projects: ProjectItem[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Create scroll-linked animations
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);
	const titleY = useTransform(scrollYProgress, [0, 0.1, 1], [50, 0, 0]);

	// Create a progress circle animation
	const progressPathLength = scrollYProgress;

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="flex items-center justify-center py-20"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
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

					<div className="space-y-12">
						{projects.map((project, index) => {
							// Create staggered animations for each project item
							const itemOpacity = useTransform(
								scrollYProgress,
								[0.1 + index * 0.05, 0.2 + index * 0.05, 1],
								[0, 1, 1],
							);
							const itemY = useTransform(
								scrollYProgress,
								[0.1 + index * 0.05, 0.2 + index * 0.05, 1],
								[50, 0, 0],
							);

							return (
								<motion.div
									key={project.title}
									className="border-b border-white/10 pb-12 last:border-0 group"
									style={{
										opacity: itemOpacity,
										y: itemY,
									}}
								>
									<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
										<h3 className="text-4xl md:text-5xl font-light group-hover:text-accent transition-colors">
											{project.title}
										</h3>
										<span className="text-white/60">{project.year}</span>
									</div>
									<p className="text-white/80 max-w-2xl">
										{project.description}
									</p>

									{/* Display tags if available */}
									{project.tags && project.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 mt-3">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 text-xs bg-white/10 rounded-md"
												>
													{tag}
												</span>
											))}
										</div>
									)}

									{/* Display project links if available */}
									{(project.url || project.repositoryUrl) && (
										<div className="flex gap-4 mt-4">
											{project.url && (
												<a
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-accent hover:underline"
												>
													View Project
												</a>
											)}
											{project.repositoryUrl && (
												<a
													href={project.repositoryUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="text-white/70 hover:text-white hover:underline"
												>
													Source Code
												</a>
											)}
										</div>
									)}
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
