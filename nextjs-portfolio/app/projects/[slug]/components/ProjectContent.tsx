import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { PortableText } from "@portabletext/react";
import { Challenges } from "./Challenges";
import { ProjectLinks } from "./ProjectLinks";
import { ScreenshotGallery } from "./ScreenshotGallery";

export function ProjectContent({ project }: { project: ProjectItem }) {
	return (
		<div className="prose prose-invert max-w-none">
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
		</div>
	);
}
