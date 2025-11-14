"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectMobileCardProps {
	project: ProjectItem;
	index: number;
	scrollYProgress: MotionValue<number>;
}

export function ProjectMobileCard({ project, index, scrollYProgress }: ProjectMobileCardProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// Create staggered animations based on scroll progress
	const itemOpacity = useTransform(
		scrollYProgress,
		[0.1 + index * 0.05, 0.2 + index * 0.05],
		[0, 1],
	);
	const itemY = useTransform(scrollYProgress, [0.1 + index * 0.05, 0.2 + index * 0.05], [50, 0]);

	// Generate slug from project data
	const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, "-");

	// Handle navigation to project detail page
	const handleNavigate = () => {
		if (isLoading) return;
		setIsLoading(true);
		router.push(`/projects/${slug}`);
	};

	return (
		<motion.div
			className={`relative rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 h-48 sm:h-56 ${isLoading ? "border-accent/50" : ""}`}
			style={{
				opacity: itemOpacity,
				y: itemY,
			}}
			onClick={handleNavigate}
			whileTap={{ scale: 0.97 }}
			animate={{
				scale: isLoading ? 0.98 : 1,
				borderColor: isLoading ? "rgba(74, 222, 128, 0.5)" : "rgba(255, 255, 255, 0.1)",
			}}
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
							className={`object-cover ${isLoading ? "blur-[1px]" : ""} transition-all duration-300`}
							title={`${project.title} project thumbnail`}
						/>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/70 flex items-center justify-center">
							<span className="text-white/40 font-light">No image</span>
						</div>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10" />
				</div>

				{/* Loading indicator */}
				{isLoading && (
					<div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20">
						<div className="relative flex items-center justify-center">
							<div className="absolute -inset-1">
								<div className="w-full h-full rounded-full animate-spin bg-gradient-to-r from-accent via-accent/80 to-transparent blur-sm opacity-30" />
							</div>
							<div className="h-8 w-8 border-2 border-t-accent border-r-accent border-b-transparent border-l-transparent rounded-full animate-spin" />
						</div>
					</div>
				)}

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

					<p className="text-sm text-white/80 line-clamp-2 mb-3">{project.description}</p>

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

			{/* Loading progress bar at the bottom */}
			{isLoading && (
				<motion.div
					className="absolute bottom-0 left-0 h-0.5 bg-accent"
					initial={{ width: 0 }}
					animate={{ width: "100%" }}
					transition={{ duration: 2 }}
				/>
			)}
		</motion.div>
	);
}
