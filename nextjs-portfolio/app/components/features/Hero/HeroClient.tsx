"use client";

import { motion } from "motion/react";
import posthog from "posthog-js";
import { useEffect } from "react";
import { DownloadResumeButton } from "../../ui/DownloadResumeButton";
import { ScrollArrow } from "../../ui/ScrollArrow";
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

	useEffect(() => {
		posthog.capture("hero_viewed", {
			projects_count: projectsCount,
		});
	}, [projectsCount]);

	return (
		<div
			id="hero"
			className="min-h-screen flex items-start md:items-center justify-center pt-[20vh] md:pt-10 relative"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				{/* Arrow Animation */}
				<ScrollArrow />
				<div className="flex flex-col items-start md:items-start">
					<Heading />
					<Bio />
					<div className="flex flex-wrap gap-4 mt-6">
						<ContactButton />
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.9 }}
						>
							<DownloadResumeButton variant="secondary" />
						</motion.div>
					</div>
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
