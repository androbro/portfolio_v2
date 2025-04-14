"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectMobileCardProps {
	project: ProjectItem;
	index: number;
	scrollYProgress: MotionValue<number>;
}

export function ProjectMobileCard({
	project,
	index,
	scrollYProgress,
}: ProjectMobileCardProps) {
	const router = useRouter();

	// Create staggered animations based on scroll progress
	const itemOpacity = useTransform(
		scrollYProgress,
		[0.1 + index * 0.05, 0.2 + index * 0.05],
		[0, 1],
	);
	const itemY = useTransform(
		scrollYProgress,
		[0.1 + index * 0.05, 0.2 + index * 0.05],
		[50, 0],
	);

	// Generate slug from project data
	const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, "-");

	// Handle navigation to project detail page
	const handleNavigate = () => {
		router.push(`/projects/${slug}`);
	};

	return (
		<motion.div
			className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 h-48 sm:h-56"
			style={{
				opacity: itemOpacity,
				y: itemY,
			}}
			onClick={handleNavigate}
			whileTap={{ scale: 0.97 }}
			transition={{ type: "tween", duration: 0.3 }}
		>
			{/* Card content wrapper */}
			<div className="absolute inset-0 flex flex-col">
				{/* Image and gradient overlay */}
				<div className="absolute inset-0 z-0">
					{project.cardImage ? (
						<Image
							src={project.cardImage}
							alt={`${project.title} project thumbnail`}
							fill
							className="object-cover"
							title={`${project.title} project thumbnail`}
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/70 flex items-center justify-center">
							<span className="text-white/40 font-light">No image</span>
						</div>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
				</div>

				{/* Content overlay */}
				<div className="relative z-20 flex flex-col justify-end p-4 h-full">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-xl font-semibold tracking-tight text-white truncate">
							{project.title}
						</h3>
						<span className="text-white/60 text-sm rounded-full px-2 py-0.5 bg-black/30 font-medium">
							{project.year}
						</span>
					</div>

					<p className="text-sm text-white/70 line-clamp-2 mb-3">
						{project.description}
					</p>

					{/* Display tags if available */}
					{project.tags && project.tags.length > 0 && (
						<div className="flex flex-wrap gap-1.5 mt-auto">
							{project.tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white/80 border border-white/10"
								>
									{tag}
								</span>
							))}
							{project.tags.length > 3 && (
								<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent/90 border border-accent/30">
									+{project.tags.length - 3}
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}
