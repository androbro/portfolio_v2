"use client";

import { motion } from "motion/react";
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
				<div className="flex flex-col items-start md:items-start">
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

			{/* Arrow SVG Animation */}
			<motion.svg
				id="banner-arrow-svg"
				width="376"
				height="111"
				viewBox="0 0 376 111"
				fill="transparent"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute bottom-20 left-1/2 -translate-x-1/2 z-0"
				initial={{ opacity: 0, y: 0 }}
				animate={{
					opacity: 1,
					y: [0, 15, 0],
					transition: {
						opacity: { duration: 1.5, ease: "easeInOut" },
						y: {
							duration: 2,
							ease: "easeInOut",
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
							delay: 1.2, // Start moving after fading in to 75%
						},
					},
				}}
				aria-labelledby="arrow-title"
			>
				<title id="arrow-title">Scroll down arrow</title>
				<motion.path
					className="svg-arrow svg-arrow-1"
					d="M1 1V39.9286L188 110V70.6822L1 1Z"
					stroke="#2C2C2C"
					initial={{ pathLength: 0 }}
					animate={{
						pathLength: 1,
						transition: { duration: 1.8, ease: "easeInOut" },
					}}
				/>
				<motion.path
					className="svg-arrow svg-arrow-2"
					d="M375 1V39.9286L188 110V70.6822L375 1Z"
					stroke="#2C2C2C"
					initial={{ pathLength: 0 }}
					animate={{
						pathLength: 1,
						transition: { duration: 1.8, ease: "easeInOut", delay: 0.2 },
					}}
				/>
			</motion.svg>
		</div>
	);
}
