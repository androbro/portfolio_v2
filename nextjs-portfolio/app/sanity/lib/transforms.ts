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
	fullDescription?: PortableTextBlock[];
	publishedYear?: string;
	cardImage?: SanityImageSource;
	image?: SanityImageSource;
	url?: string;
	repositoryUrl?: string;
	tags?: string[];
	slug?: {
		current: string;
	};
	projectScreenshots?: Array<{
		url: string;
		alt?: string;
		caption?: string;
	}>;
	features?: string[];
	challenges?: Array<{
		challenge: string;
		solution: string;
	}>;
	duration?: string;
}

// Output structure expected by ProjectsClient
export interface ProjectItem {
	title: string;
	description: string;
	fullDescription: PortableTextBlock[] | string;
	year: string;
	image?: string;
	cardImage?: string;
	url?: string;
	repositoryUrl?: string;
	tags: string[];
	slug?: string;
	projectScreenshots?: Array<{
		url: string;
		alt?: string;
		caption?: string;
	}>;
	features?: string[];
	challenges?: Array<{
		challenge: string;
		solution: string;
	}>;
	duration?: string;
}

// Input structure from Sanity for tech stack items
export interface SanityTechStackItem extends SanityDocument {
	name: string;
	category: string;
	icon?: SanityImageSource;
}

// Output structure for tech stack items
export interface TechStackItem {
	name: string;
	iconUrl: string;
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
			image: item.image ? urlForImage(item.image).url() : undefined,
			cardImage: item.cardImage ? urlForImage(item.cardImage).url() : undefined,
			url: item.url,
			repositoryUrl: item.repositoryUrl,
			tags: Array.isArray(item.tags) ? item.tags : [],
			slug: item.slug?.current,
			projectScreenshots: item.projectScreenshots || [],
			features: item.features || [],
			challenges: item.challenges || [],
			duration: item.duration,
			// Keep fullDescription as the portable text array for rich text rendering
			fullDescription: item.fullDescription || descriptionText,
		};
	});
}

/**
 * Transforms raw Sanity tech stack documents into the format expected by the TechStackClient component.
 * @param techStackItems - Array of Sanity tech stack documents.
 * @returns Object with categories as keys and arrays of transformed TechStackItem objects as values.
 */
export function transformSanityTechStack(
	techStackItems: SanityTechStackItem[],
): Record<string, TechStackItem[]> {
	const transformedTechStack: Record<string, TechStackItem[]> = {};

	for (const item of techStackItems) {
		// Make sure the category exists in our object
		if (!transformedTechStack[item.category]) {
			transformedTechStack[item.category] = [];
		}

		// Add the tech item to the appropriate category
		transformedTechStack[item.category].push({
			name: item.name,
			iconUrl: item.icon
				? urlForImage(item.icon).url()
				: `/icons/${item.name.toLowerCase()}.svg`,
		});
	}

	return transformedTechStack;
}
