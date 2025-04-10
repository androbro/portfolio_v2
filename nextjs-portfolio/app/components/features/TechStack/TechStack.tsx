import { client } from "@/app/sanity/client";
import { allTechStackQuery } from "@/app/sanity/lib/queries";
import {
	type SanityTechStackItem,
	transformSanityTechStack,
} from "@/app/sanity/lib/transforms";
import { TechStackClient } from "./TechStackClient";

// Query and options for Sanity
// const TECHSTACK_QUERY = `*[_type == "techStack"]`;
const options = { next: { revalidate: 30 } };

export async function TechStack() {
	// Fetch data from Sanity
	const techStackItems = await client.fetch<SanityTechStackItem[]>(
		allTechStackQuery,
		{},
		options,
	);

	// Transform Sanity data using the imported function
	const transformedTechStack = transformSanityTechStack(techStackItems);

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
