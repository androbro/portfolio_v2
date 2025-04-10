import { client } from "@/app/sanity/client";
import { allTechStackQuery } from "@/app/sanity/lib/queries";
import type { SanityDocument } from "next-sanity";
import { TechStackClient, type TechStackDataType } from "./TechStackClient";

// Query and options for Sanity
// const TECHSTACK_QUERY = `*[_type == "techStack"]`;
const options = { next: { revalidate: 30 } };

export async function TechStack() {
	// Fetch data from Sanity
	const techStackItems = await client.fetch<SanityDocument[]>(
		allTechStackQuery,
		{},
		options,
	);

	// Transform Sanity data to match the expected format
	const transformedTechStack: TechStackDataType = {};

	// Process the Sanity data into the required format
	for (const item of techStackItems) {
		// Make sure the category exists in our object
		if (!transformedTechStack[item.category]) {
			transformedTechStack[item.category] = [];
		}

		// Add the tech item to the appropriate category
		transformedTechStack[item.category].push({
			name: item.name,
			iconUrl: item.iconUrl || `/icons/${item.name.toLowerCase()}.svg`, // Fallback
		});
	}

	// Get all category names from the transformed data
	const allCategories = Object.keys(transformedTechStack);

	// Return the client component with the fetched data
	return (
		<TechStackClient
			techStackData={transformedTechStack}
			allCategories={allCategories}
		/>
	);
}
