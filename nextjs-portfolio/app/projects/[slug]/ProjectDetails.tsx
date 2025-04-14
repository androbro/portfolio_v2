"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion } from "motion/react";
import { BackLink, ProjectContent, ProjectHeader } from "./components";

export default function ProjectDetails({ project }: { project: ProjectItem }) {
	return (
		<main className="min-h-screen">
			{/* Project Header Section */}
			<div
				id="project-header"
				className="flex items-center justify-center md:pt-20"
			>
				<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<BackLink />
						<ProjectHeader project={project} />
					</motion.div>
				</div>
			</div>

			{/* Project Content Section */}
			<div
				id="project-content"
				className="flex items-center justify-center m-6 mt-2 "
			>
				<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<ProjectContent project={project} />
					</motion.div>
				</div>
			</div>
		</main>
	);
}
