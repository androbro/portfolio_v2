"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ProjectExpandedContent } from "./ProjectExpandedContent";
import { ProjectTags } from "./ProjectTags";

interface ProjectContentProps {
	project: ProjectItem;
	isExpanded: boolean;
	smoothTransition: {
		type: string;
		duration: number;
		ease: string;
	};
	handleNavigate: (e: React.MouseEvent | React.KeyboardEvent) => void;
	handleCollapse: (e: React.MouseEvent) => void;
}

export function ProjectContent({
	project,
	isExpanded,
	smoothTransition,
	handleNavigate,
	handleCollapse,
}: ProjectContentProps) {
	const [isTextTruncated, setIsTextTruncated] = useState(false);
	const textRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const checkTruncation = () => {
			if (textRef.current && !isExpanded) {
				const isOverflowing =
					textRef.current.scrollHeight > textRef.current.clientHeight;
				setIsTextTruncated(isOverflowing);
			} else {
				setIsTextTruncated(false);
			}
		};

		checkTruncation();
		window.addEventListener("resize", checkTruncation);
		return () => window.removeEventListener("resize", checkTruncation);
	}, [isExpanded]);

	return (
		<motion.div
			className={`p-6 ${isExpanded ? "md:w-1/2" : "md:w-2/3"} flex flex-col`}
			animate={{
				width: isExpanded ? "50%" : "66.667%",
			}}
			transition={smoothTransition}
			layout="preserve-aspect"
		>
			<motion.div
				layout="position"
				className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3"
			>
				<motion.h3
					layout="position"
					className="text-2xl md:text-3xl font-light group-hover:text-accent transition-colors truncate"
					transition={smoothTransition}
				>
					{project.title}
				</motion.h3>
				<motion.span
					layout="position"
					className="text-white/60 shrink-0"
					transition={smoothTransition}
				>
					{project.year}
				</motion.span>
			</motion.div>

			<motion.div className="relative">
				<motion.p
					ref={textRef}
					layout="position"
					className={`text-lg text-white/80 mb-4 ${isExpanded ? "" : "line-clamp-1"}`}
					animate={{
						height: isExpanded ? "auto" : "1.75em",
					}}
					transition={smoothTransition}
				>
					{project.description}
					{!isExpanded && isTextTruncated && (
						<span className="text-accent">...</span>
					)}
				</motion.p>
			</motion.div>

			{/* Display tags if available */}
			{project.tags && (
				<motion.div layout="position" className="flex-grow">
					<ProjectTags
						tags={project.tags}
						isExpanded={isExpanded}
						smoothTransition={smoothTransition}
					/>
				</motion.div>
			)}

			{/* Show more content when expanded */}
			<AnimatePresence mode="sync" initial={false}>
				{isExpanded && (
					<ProjectExpandedContent
						key="project-expanded-content"
						project={project}
						smoothTransition={smoothTransition}
					/>
				)}
			</AnimatePresence>

			<motion.div
				layout="position"
				className="flex items-center justify-between mt-auto pt-4"
				transition={smoothTransition}
			>
				<motion.button
					layout="position"
					type="button"
					onClick={handleNavigate}
					onKeyDown={handleNavigate}
					className="px-3 py-2 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-all flex items-center gap-1 shadow-sm"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ ...smoothTransition, duration: 0.2 }}
				>
					<motion.span layout="position" className="font-medium">
						View Project
					</motion.span>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="ml-1"
						title="View project arrow"
					>
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</motion.svg>
				</motion.button>
			</motion.div>
		</motion.div>
	);
}
