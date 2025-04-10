import { client } from "@/app/sanity/client";
import { projectBySlugQuery } from "@/app/sanity/lib/queries";
import {
	type ProjectItem,
	type SanityProject,
	transformSanityProjects,
} from "@/app/sanity/lib/transforms";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
	params: Promise<{
		slug: string;
	}>;
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const resolvedParams = await params;
	const project = await getProject(resolvedParams.slug);

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
		const project = await client.fetch<SanityProject | null>(
			projectBySlugQuery,
			{ slug },
			{ next: { revalidate: 30 } },
		);

		if (!project) {
			return null;
		}

		const [transformedProject] = transformSanityProjects([project]);
		return transformedProject;
	} catch (error) {
		console.error("Error fetching project:", error);
		return null;
	}
}

// Component for project header
function ProjectHeader({ project }: { project: ProjectItem }) {
	return (
		<header className="mb-12">
			<h1 className="text-4xl md:text-5xl font-light mb-4">{project.title}</h1>
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
	);
}

// Component for project content
function ProjectContent({ project }: { project: ProjectItem }) {
	return (
		<div className="prose prose-invert max-w-none">
			<p className="text-lg text-white/80">{project.fullDescription}</p>

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
	);
}

// Back link component
function BackLink() {
	return (
		<Link
			href="/#projects"
			className="inline-flex items-center text-accent hover:underline mb-8"
		>
			← Back to Projects
		</Link>
	);
}

export default async function ProjectPage({ params }: Props) {
	const resolvedParams = await params;
	const project = await getProject(resolvedParams.slug);

	if (!project) {
		notFound();
	}

	return (
		<>
			<Suspense
				fallback={
					<div className="inline-flex items-center text-accent/70 mb-8">
						← Back to Projects
					</div>
				}
			>
				<BackLink />
			</Suspense>

			<article className="max-w-4xl mx-auto">
				<Suspense
					fallback={
						<div className="h-12 w-3/4 bg-white/10 rounded-md mb-4 animate-pulse" />
					}
				>
					<ProjectHeader project={project} />
				</Suspense>

				<Suspense
					fallback={
						<div className="h-6 w-full bg-white/10 rounded-md mb-4 animate-pulse" />
					}
				>
					<ProjectContent project={project} />
				</Suspense>
			</article>
		</>
	);
}
