import type { ProjectItem } from "@/app/sanity/lib/transforms";
import Image from "next/image";

export function ProjectHeader({ project }: { project: ProjectItem }) {
	return (
		<header className="mb-10">
			<h1 className="text-4xl md:text-5xl font-light mb-4">{project.title}</h1>
			<div className="flex flex-wrap items-center gap-4 text-white/60 mb-6">
				<span>{project.year}</span>
				{project.duration && (
					<span className="text-white/60">Duration: {project.duration}</span>
				)}
			</div>
			{project.image && (
				<div className="relative w-full h-[400px] mb- rounded-lg overflow-hidden">
					<Image
						src={project.image}
						alt={`${project.title} project`}
						fill
						className="object-cover"
						priority
					/>
				</div>
			)}
			{project.tags && project.tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-2">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 text-xs bg-white/10 rounded-md"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</header>
	);
}
