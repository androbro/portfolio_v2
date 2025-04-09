import { client } from "@/app/sanity/client";
import type { SanityDocument } from "next-sanity";
import { type ProjectItem, ProjectsClient } from "./ProjectsClient";

// Query and options for Sanity
const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc) {
  ...,
  "tags": tags[]->name
}`;
const options = { next: { revalidate: 30 } };

// Types for Portable Text
interface PortableTextSpan {
	_type: string;
	text: string;
	marks?: string[];
}

interface PortableTextBlock {
	_type: string;
	_key?: string;
	style?: string;
	children?: PortableTextSpan[];
	markDefs?: Array<{ _key: string; _type: string }>;
}

export async function Projects() {
	// Fetch data from Sanity
	const projectItems = await client.fetch<SanityDocument[]>(
		PROJECTS_QUERY,
		{},
		options,
	);

	// Transform Sanity data to match the expected format
	const transformedProjects: ProjectItem[] = projectItems.map((item) => {
		// Convert description to string if it's a rich text field
		let descriptionText = "";

		if (typeof item.description === "string") {
			descriptionText = item.description;
		} else if (Array.isArray(item.description)) {
			// Extract text content from Portable Text
			descriptionText = item.description
				.map((block: PortableTextBlock) => {
					// Handle different block types
					if (block._type === "block" && Array.isArray(block.children)) {
						return block.children
							.map((child: PortableTextSpan) => child.text || "")
							.join("");
					}
					return "";
				})
				.filter(Boolean)
				.join(" ");
		}

		return {
			title: item.title,
			description: descriptionText,
			year: item.publishedYear || new Date().getFullYear().toString(),
			image: item.image,
			url: item.url,
			repositoryUrl: item.repositoryUrl,
			tags: Array.isArray(item.tags) ? item.tags : [],
		};
	});

	// Return the client component with the fetched data
	return <ProjectsClient projects={transformedProjects} />;
}
