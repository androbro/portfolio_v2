"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { BackLink, ProjectContent, ProjectHeader } from "./components";

export default function ProjectDetails({ project }: { project: ProjectItem }) {
	return (
		<>
			<article className="max-w-4xl mx-auto">
				<BackLink />
				<ProjectHeader project={project} />
				<ProjectContent project={project} />
			</article>
		</>
	);
}
