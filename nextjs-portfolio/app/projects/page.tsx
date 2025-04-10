import { client } from "@/app/sanity/client";
import { allProjectsQueryDetailed } from "@/app/sanity/lib/queries";
import {
	type ProjectItem,
	type SanityProject,
	transformSanityProjects,
} from "@/app/sanity/lib/transforms";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Projects | Portfolio",
	description: "Explore my projects and work",
};

async function getProjects(): Promise<ProjectItem[]> {
	try {
		const projects = await client.fetch<SanityProject[]>(
			allProjectsQueryDetailed,
			{},
			{ next: { revalidate: 30 } },
		);

		return transformSanityProjects(projects);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return [];
	}
}

export default async function ProjectsPage() {
	const projects = await getProjects();

	return (
		<div className="content-container py-20">
			<Link
				href="/"
				className="inline-flex items-center text-accent hover:underline mb-8"
			>
				← Back to Home
			</Link>

			<h1 className="text-4xl md:text-5xl font-light mb-12">Projects</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project) => (
					<Link
						key={project.slug}
						href={`/projects/${project.slug}`}
						className="group"
					>
						<article className="bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/10">
							{project.image && (
								<div className="relative h-48 w-full">
									<Image
										src={project.image}
										alt={project.title}
										fill
										className="object-cover"
									/>
								</div>
							)}
							<div className="p-6">
								<h2 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
									{project.title}
								</h2>
								<p className="text-white/70 text-sm mb-4 line-clamp-2">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tags?.slice(0, 3).map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 text-xs bg-white/10 rounded-md"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</article>
					</Link>
				))}
			</div>
		</div>
	);
}
