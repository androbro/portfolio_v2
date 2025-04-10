import { client } from "@/app/sanity/client";
import { allExperienceQuery } from "@/app/sanity/lib/queries";
import type { SanityDocument } from "next-sanity";
import { ExperienceClient, type ExperienceItem } from "./ExperienceClient";

// Query and options for Sanity
// const EXPERIENCE_QUERY = `*[_type == "workExperience"] | order(startDate desc)`;
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

export async function Experience() {
	// Fetch data from Sanity
	const experienceItems = await client.fetch<SanityDocument[]>(
		allExperienceQuery,
		{},
		options,
	);

	// Transform Sanity data to match the expected format
	const transformedExperiences: ExperienceItem[] = experienceItems.map(
		(item) => {
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
				company: item.company,
				role: item.role,
				period:
					item.period || `${item.startDate} - ${item.endDate || "Present"}`,
				description: descriptionText,
			};
		},
	);

	// Return the client component with the fetched data
	return <ExperienceClient experiences={transformedExperiences} />;
}
