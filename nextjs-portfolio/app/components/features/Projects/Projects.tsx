import { client } from "@/app/sanity/client";
import { allProjectsQueryDetailed } from "@/app/sanity/lib/queries";
import {
	type ProjectItem,
	type SanityProject,
	transformSanityProjects,
} from "@/app/sanity/lib/transforms";
import { ProjectsClient } from "./ProjectsClient";

const options = { next: { revalidate: 30 } };

export async function Projects() {
	// Fetch data from Sanity
	const projectItems = await client.fetch<SanityProject[]>(
		allProjectsQueryDetailed,
		{},
		options,
	);

	// Transform Sanity data using the imported function
	const transformedProjects: ProjectItem[] =
		transformSanityProjects(projectItems);

	// Return the client component with the fetched data
	return <ProjectsClient projects={transformedProjects} />;
}
