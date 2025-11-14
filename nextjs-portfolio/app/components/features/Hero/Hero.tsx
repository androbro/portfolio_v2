import { client } from "@/app/sanity/client";
import { allExperienceQuery, allProjectsQuerySimple } from "@/app/sanity/lib/queries"; // Import queries
import type { SanityDocument } from "next-sanity";
import { HeroClient } from "./HeroClient";

const options = { next: { revalidate: 30 } };

export async function Hero() {
	// Fetch project data from Sanity
	const projectItems = await client.fetch<SanityDocument[]>(
		allProjectsQuerySimple, // Use imported query
		{},
		options,
	);

	// Count total projects
	const projectsCount = projectItems.length;

	// Fetch experience data from Sanity
	const experienceItems = await client.fetch<SanityDocument[]>(
		allExperienceQuery, // Use imported query
		{},
		options,
	);

	// Calculate years of experience
	let totalYearsExperience = 0;
	let frontendYears = 0;
	let backendYears = 0;

	if (experienceItems.length > 0) {
		// Find the earliest start date
		const dates = experienceItems.map((exp) => {
			const startDate = new Date(exp.startDate);

			// Determine role type based on job role name
			const role = exp.role || "";
			const isFrontend =
				role.toLowerCase().includes("frontend") ||
				role.toLowerCase().includes("front-end") ||
				role.toLowerCase().includes("front end") ||
				role.toLowerCase().includes("ui") ||
				role.toLowerCase().includes("react");

			const isBackend =
				role.toLowerCase().includes("backend") ||
				role.toLowerCase().includes("back-end") ||
				role.toLowerCase().includes("back end") ||
				role.toLowerCase().includes("server") ||
				role.toLowerCase().includes("api");

			return {
				date: startDate,
				isFrontend,
				isBackend,
			};
		});

		// Sort dates in ascending order (oldest first)
		dates.sort((a, b) => a.date.getTime() - b.date.getTime());

		if (dates.length > 0) {
			const earliestDate = dates[0].date;
			const currentDate = new Date();

			// Calculate years difference (approximate)
			totalYearsExperience = Math.floor(
				(currentDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24 * 365),
			);

			// Calculate frontend/backend years based on job role
			for (const exp of experienceItems) {
				const startDate = new Date(exp.startDate);
				const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
				const yearsInJob = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

				// Check if job role indicates frontend/backend work
				const role = exp.role || "";
				const isFrontend =
					role.toLowerCase().includes("frontend") ||
					role.toLowerCase().includes("front-end") ||
					role.toLowerCase().includes("front end") ||
					role.toLowerCase().includes("ui") ||
					role.toLowerCase().includes("react");

				const isBackend =
					role.toLowerCase().includes("backend") ||
					role.toLowerCase().includes("back-end") ||
					role.toLowerCase().includes("back end") ||
					role.toLowerCase().includes("server") ||
					role.toLowerCase().includes("api");

				if (isFrontend) frontendYears += yearsInJob;
				if (isBackend) backendYears += yearsInJob;

				// If role is "Full Stack" or something generic, split between both
				if (
					!isFrontend &&
					!isBackend &&
					(role.toLowerCase().includes("developer") ||
						role.toLowerCase().includes("engineer") ||
						role.toLowerCase().includes("full stack") ||
						role.toLowerCase().includes("fullstack"))
				) {
					frontendYears += yearsInJob * 0.5;
					backendYears += yearsInJob * 0.5;
				}
			}
		}
	}

	// Convert decimal years to years and months
	const frontendYearsInt = Math.floor(frontendYears);
	const frontendMonths = Math.round((frontendYears - frontendYearsInt) * 12);

	const backendYearsInt = Math.floor(backendYears);
	const backendMonths = Math.round((backendYears - backendYearsInt) * 12);

	// Return the client component with the fetched data
	return (
		<HeroClient
			projectsCount={projectsCount}
			yearsExperience={totalYearsExperience}
			frontendYears={Math.max(1, frontendYearsInt)}
			backendYears={backendYearsInt}
			frontendMonths={frontendMonths}
			backendMonths={backendMonths}
		/>
	);
}
