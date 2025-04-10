"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms"; // Import the shared ProjectItem type
import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";

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

	// Use the slug from the project data if available, otherwise generate it from the title
	const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, "-");

	return (
		<motion.div
			key={project.title}
			className="border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
			style={{
				opacity: itemOpacity,
				y: itemY,
			}}
		>
			<Link href={`/projects/${slug}`} className="block">
				<div className="flex flex-col md:flex-row">
					{/* Project Image */}
					<div className="relative w-full md:w-1/3 h-48 md:h-auto">
						{project.image ? (
							<Image
								src={project.image}
								alt={`${project.title} project thumbnail`}
								fill
								className="object-cover"
								title={`${project.title} project thumbnail`}
							/>
						) : (
							<div className="w-full h-full bg-white/5 flex items-center justify-center">
								<span className="text-white/40">No image</span>
							</div>
						)}
					</div>

					{/* Project Content */}
					<div className="p-6 md:w-2/3">
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
							<h3 className="text-2xl md:text-3xl font-light group-hover:text-accent transition-colors">
								{project.title}
							</h3>
							<span className="text-white/60">{project.year}</span>
						</div>

						<p className="text-white/80 mb-4 line-clamp-2">
							{project.description}
						</p>

						{/* Display tags if available */}
						{project.tags && project.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{project.tags.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className="px-2 py-1 text-xs bg-white/10 rounded-md"
									>
										{tag}
									</span>
								))}
								{project.tags.length > 3 && (
									<span className="px-2 py-1 text-xs bg-white/10 rounded-md">
										+{project.tags.length - 3} more
									</span>
								)}
							</div>
						)}

						<div className="flex items-center text-accent">
							<span>View Project</span>
							<span className="ml-1">→</span>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
