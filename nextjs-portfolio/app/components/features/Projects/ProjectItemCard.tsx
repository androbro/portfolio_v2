"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms"; // Import the shared ProjectItem type
import { AnimatePresence, type MotionValue, motion, useTransform } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
	};

	return (
		<motion.div
			ref={cardRef}
			key={project.title}
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
				<motion.div 
					className={`relative ${isExpanded ? 'md:w-1/2' : 'md:w-1/3'} h-48 md:h-auto m-2`}
					animate={{
						width: isExpanded ? '50%' : '33.333%',
					}}
					transition={smoothTransition}
					layout
				>
					{project.cardImage ? (
						<Image
							src={project.cardImage}
							alt={`${project.title} project thumbnail`}
							fill
							className="object-contain"
							title={`${project.title} project thumbnail`}
						/>
					) : (
						<div className="w-full h-full bg-white/5 flex items-center justify-center">
							<span className="text-white/40">No image</span>
						</div>
					)}
				</motion.div>

				{/* Project Content */}
				<motion.div 
					className={`p-6 ${isExpanded ? 'md:w-1/2' : 'md:w-2/3'}`}
					animate={{
						width: isExpanded ? '50%' : '66.667%',
					}}
					transition={smoothTransition}
					layout
				>
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
						<h3 className="text-2xl md:text-3xl font-light group-hover:text-accent transition-colors">
							{project.title}
						</h3>
						<span className="text-white/60">{project.year}</span>
					</div>

					<motion.p 
						className={`text-white/80 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}
						animate={{
							height: isExpanded ? 'auto' : '3em',
						}}
						transition={smoothTransition}
					>
						{project.description}
					</motion.p>

					{/* Display tags if available */}
					<motion.div 
						className="flex flex-wrap gap-2 mb-4"
						animate={{
							height: isExpanded ? 'auto' : 'auto',
						}}
						transition={smoothTransition}
					>
						{project.tags && project.tags.length > 0 && (
							<>
								{project.tags.slice(0, isExpanded ? project.tags.length : 3).map((tag) => (
									<motion.span
										key={tag}
										className="px-2 py-1 text-xs bg-white/10 rounded-md"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ ...smoothTransition, delay: 0.2 }}
									>
										{tag}
									</motion.span>
								))}
								{!isExpanded && project.tags.length > 3 && (
									<span className="px-2 py-1 text-xs bg-white/10 rounded-md">
										+{project.tags.length - 3} more
									</span>
								)}
							</>
						)}
					</motion.div>

					{/* Show more content when expanded */}
					<AnimatePresence mode="wait">
						{isExpanded && (
							<motion.div 
								className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ ...smoothTransition, delay: 0.3 }}
							>
								{project.features && project.features.length > 0 && (
									<motion.div 
										className="mb-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ ...smoothTransition, delay: 0.4 }}
									>
										<h4 className="text-lg font-medium mb-2">Key Features:</h4>
										<ul className="list-disc pl-5 space-y-1">
											{project.features.slice(0, 3).map((feature, i) => (
												<motion.li 
													key={i} 
													className="text-white/70"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ ...smoothTransition, delay: 0.5 + i * 0.1 }}
												>
													{feature}
												</motion.li>
											))}
										</ul>
									</motion.div>
								)}
								
								{project.challenges && project.challenges.length > 0 && (
									<motion.div 
										className="mb-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ ...smoothTransition, delay: 0.6 }}
									>
										<h4 className="text-lg font-medium mb-2">Challenges:</h4>
										<ul className="list-disc pl-5 space-y-1">
											{project.challenges.slice(0, 1).map((challenge, i) => (
												<motion.li 
													key={i} 
													className="text-white/70"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ ...smoothTransition, delay: 0.7 }}
												>
													<span className="font-medium">{challenge.challenge}:</span> {challenge.solution}
												</motion.li>
											))}
										</ul>
									</motion.div>
								)}
							</motion.div>
						)}
					</AnimatePresence>

					<div className="flex items-center justify-between mt-4">
						<button
							type="button"
							onClick={handleNavigate}
							onKeyDown={handleNavigate}
							className="flex items-center text-accent hover:underline"
						>
							<span>View Project</span>
							<span className="ml-1">→</span>
						</button>
						
						{isExpanded && (
							<motion.button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									setIsExpanded(false);
								}}
								className="text-white/60 hover:text-white"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ ...smoothTransition, delay: 0.4 }}
							>
								Collapse
							</motion.button>
						)}
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}
