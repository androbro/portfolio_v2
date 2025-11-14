import { client } from "@/app/sanity/client";
import { projectBySlugQuery } from "@/app/sanity/lib/queries";
import {
	type ProjectItem,
	type SanityProject,
	transformSanityProjects,
} from "@/app/sanity/lib/transforms";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProjectDetails from "./ProjectDetails";

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

export default async function ProjectPage({ params }: Props) {
	const resolvedParams = await params;
	const project = await getProject(resolvedParams.slug);

	if (!project) {
		notFound();
	}

	return (
		<Suspense fallback={<div className="animate-pulse h-96 bg-white/5 rounded-lg" />}>
			<ProjectDetails project={project} />
		</Suspense>
	);
}
