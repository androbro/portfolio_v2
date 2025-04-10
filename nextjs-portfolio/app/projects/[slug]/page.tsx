import { client } from "@/app/sanity/client";
import { projectBySlugQuery } from "@/app/sanity/lib/queries";
import {
	type ProjectItem,
	type SanityProject,
	transformSanityProjects,
} from "@/app/sanity/lib/transforms";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Updated interface to match Next.js 15's expected type structure
type ProjectPageProps = {
	params: {
		slug: string;
	};
	searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params }: ProjectPageProps) {
	const project = await getProject(params.slug);

	if (!project) {
		return {
			title: "Project Not Found",
		};
	}

	return {
		title: `${project.title} | Portfolio`,
		description: project.description,
	};
}

async function getProject(slug: string): Promise<ProjectItem | null> {
	try {
		// Fetch only the specific project by slug
		const project = await client.fetch<SanityProject | null>(
			projectBySlugQuery,
			{ slug },
			{ next: { revalidate: 30 } },
		);

		if (!project) {
			return null;
		}

		// Transform the single project
		const [transformedProject] = transformSanityProjects([project]);
		return transformedProject;
	} catch (error) {
		console.error("Error fetching project:", error);
		return null;
	}
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const project = await getProject(params.slug);

	if (!project) {
		notFound();
	}

	return (
		<div className="content-container py-20">
			<Link
				href="/#projects"
				className="inline-flex items-center text-accent hover:underline mb-8"
			>
				← Back to Projects
			</Link>

			<article className="max-w-4xl mx-auto">
				<header className="mb-12">
					<h1 className="text-4xl md:text-5xl font-light mb-4">
						{project.title}
					</h1>
					<div className="flex items-center gap-4 text-white/60 mb-6">
						<span>{project.year}</span>
						{project.tags && project.tags.length > 0 && (
							<div className="flex flex-wrap gap-2">
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
					</div>

					{project.image && (
						<div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
							<Image
								src={project.image}
								alt={`${project.title} project`}
								fill
								className="object-cover"
								priority
							/>
						</div>
					)}
				</header>

				<div className="prose prose-invert max-w-none">
					<p className="text-lg text-white/80">{project.description}</p>

					{/* Project links */}
					{(project.url || project.repositoryUrl) && (
						<div className="flex gap-4 mt-8">
							{project.url && (
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-2 bg-accent text-black rounded-md hover:bg-accent/90 transition-colors"
								>
									View Project
								</a>
							)}
							{project.repositoryUrl && (
								<a
									href={project.repositoryUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
								>
									Source Code
								</a>
							)}
						</div>
					)}
				</div>
			</article>
		</div>
	);
}
