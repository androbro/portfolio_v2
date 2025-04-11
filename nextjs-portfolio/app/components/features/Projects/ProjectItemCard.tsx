"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms"; // Import the shared ProjectItem type
import { type MotionValue, motion, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { ProjectContent, ProjectImage } from "./components";

interface ProjectItemCardProps {
	project: ProjectItem;
	index: number;
	scrollYProgress: MotionValue<number>; // Pass scroll progress from parent
	isExpanded: boolean;
	onExpand: () => void;
	layoutId: string;
}

export function ProjectItemCard({
	project,
	index,
	scrollYProgress,
	isExpanded,
	onExpand,
	layoutId,
}: ProjectItemCardProps) {
	const router = useRouter();
	const cardRef = useRef<HTMLDivElement>(null);

	// Create staggered animations based on scroll progress
	const itemOpacity = useTransform(
		scrollYProgress,
		[0.1 + index * 0.05, 0.2 + index * 0.05],
		[0, 1]
	);
	const itemY = useTransform(
		scrollYProgress,
		[0.1 + index * 0.05, 0.2 + index * 0.05],
		[50, 0]
	);

	// Generate slug from project data
	const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, "-");

	// Handle card click to expand/collapse
	const handleCardClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onExpand();
		
		// Scroll to card when expanded
		if (!isExpanded && cardRef.current) {
			setTimeout(() => {
				cardRef.current?.scrollIntoView({ 
					behavior: 'smooth', 
					block: 'center' 
				});
			}, 100);
		}
	};

	// Handle navigation to project detail page
	const handleNavigate = (e: React.MouseEvent | React.KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/projects/${slug}`);
	};

	// Handle collapse
	const handleCollapse = (e: React.MouseEvent) => {
		e.stopPropagation();
		onExpand(); // Call onExpand to collapse
	};

	// Animation settings
	const smoothTransition = {
		type: "tween",
		duration: 0.5,
		ease: "easeInOut"
	};

	return (
		<motion.div
			ref={cardRef}
			layoutId={layoutId}
			className={`border border-white/10 rounded-lg overflow-hidden bg-white/2 hover:bg-white/10 transition-colors relative ${isExpanded ? 'col-span-2 row-span-2' : 'h-60'}`}
			style={{
				opacity: itemOpacity,
				y: itemY,
			}}
			onClick={handleCardClick}
			animate={{
				zIndex: isExpanded ? 20 : 10,
				boxShadow: isExpanded ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : 'none',
			}}
			transition={smoothTransition}
			whileHover={{ scale: 1.03 }}
			layout
		>
			<div className={`flex flex-col md:flex-row h-full`}>
				{/* Project Image */}
				<ProjectImage 
					project={project} 
					isExpanded={isExpanded} 
					smoothTransition={smoothTransition} 
				/>

				{/* Project Content */}
				<ProjectContent 
					project={project} 
					isExpanded={isExpanded} 
					smoothTransition={smoothTransition} 
					handleNavigate={handleNavigate} 
					handleCollapse={handleCollapse} 
				/>
			</div>
		</motion.div>
	);
}
