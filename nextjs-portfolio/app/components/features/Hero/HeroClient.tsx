"use client";

import { Bio } from "./components/Bio";
import { ContactButton } from "./components/ContactButton";
import { Heading } from "./components/Heading";
import { Stats } from "./components/stats/Stats";
import { useWorkingHours } from "./hooks/useWorkingHours";
interface HeroClientProps {
	projectsCount: number;
	yearsExperience: number;
	frontendYears: number;
	backendYears: number;
	frontendMonths: number;
	backendMonths: number;
}
export function HeroClient({
	projectsCount,
	yearsExperience,
	frontendYears,
	backendYears,
	frontendMonths,
	backendMonths,
}: HeroClientProps) {
	const workHours = useWorkingHours();

	return (
		<div
			id="hero"
			className="min-h-screen flex items-start md:items-center justify-center pt-[20vh] md:pt-10 relative"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="flex flex-col items-start md:items-start m-4">
					<Heading />
					<Bio />
					<ContactButton />
					<Stats
						yearsExperience={yearsExperience}
						frontendYears={frontendYears}
						backendYears={backendYears}
						frontendMonths={frontendMonths}
						backendMonths={backendMonths}
						projectsCount={projectsCount}
						workHours={workHours}
					/>
				</div>
			</div>
		</div>
	);
}
