"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion } from "motion/react";

interface ProjectExpandedContentProps {
	project: ProjectItem;
	smoothTransition: {
		type: string;
		duration: number;
		ease: string;
	};
}

export function ProjectExpandedContent({ project, smoothTransition }: ProjectExpandedContentProps) {
	return (
		<motion.div
			className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: "auto" }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ ...smoothTransition, height: { duration: smoothTransition.duration * 0.8 } }}
		>
			{project.features && project.features.length > 0 && (
				<motion.div
					className="mb-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ...smoothTransition, delay: 0.1 }}
				>
					<motion.h4 className="text-lg font-medium mb-2">Key Features:</motion.h4>
					<motion.ul className="list-disc pl-5 space-y-1">
						{project.features.slice(0, 3).map((feature, i) => (
							<motion.li
								key={i}
								className="text-white/70"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ ...smoothTransition, delay: 0.2 + i * 0.1 }}
							>
								{feature}
							</motion.li>
						))}
					</motion.ul>
				</motion.div>
			)}

			{project.challenges && project.challenges.length > 0 && (
				<motion.div
					className="mb-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ ...smoothTransition, delay: 0.2 }}
				>
					<motion.h4 className="text-lg font-medium mb-2">Challenges:</motion.h4>
					<motion.ul className="list-disc pl-5 space-y-1">
						{project.challenges.slice(0, 1).map((challenge, i) => (
							<motion.li
								key={i}
								className="text-white/70"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ ...smoothTransition, delay: 0.3 }}
							>
								<motion.span className="font-medium">{challenge.challenge}:</motion.span>{" "}
								{challenge.solution}
							</motion.li>
						))}
					</motion.ul>
				</motion.div>
			)}
		</motion.div>
	);
}
