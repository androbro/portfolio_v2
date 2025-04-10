import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { PortableText } from "@portabletext/react";
import { motion } from "motion/react";
import { Challenges } from "./Challenges";
import { ProjectLinks } from "./ProjectLinks";
import { ScreenshotGallery } from "./ScreenshotGallery";
export function ProjectContent({ project }: { project: ProjectItem }) {
	return (
		<motion.div
			className="prose prose-invert max-w-none"
			initial={{ opacity: 0, y: 150 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1, delay: 1.1 }}
		>
			{typeof project.fullDescription === "string" ? (
				<p className="text-lg text-white/80">{project.fullDescription}</p>
			) : (
				<div className="text-lg text-white/80">
					<PortableText value={project.fullDescription} />
				</div>
			)}
			<Challenges challenges={project.challenges} />
			<ScreenshotGallery screenshots={project.projectScreenshots} />
			<ProjectLinks url={project.url} repositoryUrl={project.repositoryUrl} />
		</motion.div>
	);
}
