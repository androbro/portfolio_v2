"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms"; // Import the shared ProjectItem type
import { type MotionValue, motion, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ProjectContent, ProjectImage } from "./components";

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
	const router = useRouter();
	const [isNavigating, setIsNavigating] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [expandDirection, setExpandDirection] = useState<'right' | 'left'>('right');
	const cardRef = useRef<HTMLDivElement>(null);

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

	// Determine expand direction based on card position
	useEffect(() => {
		if (cardRef.current) {
			const rect = cardRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;
			const cardCenter = rect.left + rect.width / 2;
			
			// If card is in the right half of the screen, expand to the left
			setExpandDirection(cardCenter > windowWidth / 2 ? 'left' : 'right');
		}
	}, []);

	// Handle card click to expand/collapse
	const handleCardClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsExpanded(!isExpanded);
		
		// Scroll to the card when expanded
		if (!isExpanded && cardRef.current) {
			// Use setTimeout to ensure the expansion animation has started
			setTimeout(() => {
				cardRef.current?.scrollIntoView({ 
					behavior: 'smooth', 
					block: 'center' 
				});
			}, 100);
		}
	};

	// Handle navigation with loading state
	const handleNavigate = (e: React.MouseEvent | React.KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation(); // Prevent card click from triggering
		setIsNavigating(true);
		router.push(`/projects/${slug}`);
	};

	// Handle collapse
	const handleCollapse = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsExpanded(false);
	};

	// Common animation settings for smoother transitions
	const smoothTransition = {
		type: "tween",
		duration: 0.8,
		ease: "easeInOut"
	};

	// Card expansion animation
	const cardAnimation = {
		width: isExpanded ? '100%' : '100%',
		height: isExpanded ? '100%' : '100%',
		zIndex: isExpanded ? 20 : 10,
		boxShadow: isExpanded ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : 'none',
		// Add transformOrigin based on expand direction
		transformOrigin: expandDirection === 'left' ? 'bottom right' : 'bottom left',
	};

	return (
		<motion.div
			ref={cardRef}
			key={project.title}
			layoutId={`project-card-${project.title}`}
			className={`border border-white/10 rounded-lg overflow-hidden bg-white/2 hover:bg-white/10 transition-colors relative ${isExpanded ? 'col-span-2 row-span-2' : ''}`}
			style={{
				opacity: itemOpacity,
				y: itemY,
			}}
			onClick={handleCardClick}
			animate={cardAnimation}
			transition={smoothTransition}
			layout
		>
			<div className={`flex flex-col md:flex-row h-full ${isExpanded ? 'h-full' : ''}`}>
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
