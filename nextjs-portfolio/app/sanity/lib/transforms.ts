// Import the specific type for Sanity image sources if available
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "next-sanity";
// Assuming you have this helper setup, adjust path if necessary
import { urlForImage } from "./image";

// Type for Portable Text Spans
interface PortableTextSpan {
	_type: "span";
	text: string;
	marks?: string[];
}

// Type for Portable Text Blocks
interface PortableTextBlock {
	_type: "block";
	_key?: string;
	style?: string;
	children?: PortableTextSpan[];
	markDefs?: Array<{ _key: string; _type: string }>;
}

// Input structure from Sanity (matching allProjectsQueryDetailed)
export interface SanityProject extends SanityDocument {
	title: string;
	description: string | PortableTextBlock[];
	publishedYear?: string;
	image?: SanityImageSource;
	url?: string;
	repositoryUrl?: string;
	tags?: string[];
	slug?: {
		current: string;
	};
}

// Output structure expected by ProjectsClient
export interface ProjectItem {
	title: string;
	description: string;
	year: string;
	image?: string; // Expects a URL string
	url?: string;
	repositoryUrl?: string;
	tags: string[];
	slug?: string; // Add slug property
}

/**
 * Transforms raw Sanity project documents into the format expected by the ProjectsClient component.
 * @param projectItems - Array of Sanity project documents.
 * @returns Array of transformed ProjectItem objects.
 */
export function transformSanityProjects(
	// Use the specific SanityProject type for the input
	projectItems: SanityProject[],
): ProjectItem[] {
	return projectItems.map((item) => {
		// Convert description to string if it's a rich text field
		let descriptionText = "";

		if (typeof item.description === "string") {
			descriptionText = item.description;
		} else if (Array.isArray(item.description)) {
			// Extract text content from Portable Text
			descriptionText = item.description
				.map((block: PortableTextBlock) => {
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
			title: item.title ?? "Untitled Project",
			description: descriptionText,
			year: item.publishedYear ?? new Date().getFullYear().toString(),
			// Use urlForImage to generate the image URL string if image exists
			image: item.image ? urlForImage(item.image).url() : undefined,
			url: item.url,
			repositoryUrl: item.repositoryUrl,
			tags: Array.isArray(item.tags) ? item.tags : [],
			slug: item.slug?.current, // Extract the slug from the Sanity data
		};
	});
}
