"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms"; // Import the shared ProjectItem type
import { type MotionValue, motion, useTransform } from "motion/react";

interface ProjectItemCardProps {
	project: ProjectItem;
	index: number;
	scrollYProgress: MotionValue<number>; // Pass scroll progress from parent
}

export function ProjectItemCard({
	project,
	index,
	scrollYProgress,
}: ProjectItemCardProps) {
	// Create staggered animations for each project item based on index and scroll progress
	const itemOpacity = useTransform(
		scrollYProgress,
		// Stagger the start and end points based on index
		[0.1 + index * 0.05, 0.2 + index * 0.05],
		[0, 1], // Animate from 0 to 1 opacity
	);
	const itemY = useTransform(
		scrollYProgress,
		[0.1 + index * 0.05, 0.2 + index * 0.05],
		[50, 0], // Animate from 50px down to 0
	);

	return (
		<motion.div
			key={project.title} // Keep key for list rendering
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
			<p className="text-white/80 max-w-2xl">{project.description}</p>

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
}
