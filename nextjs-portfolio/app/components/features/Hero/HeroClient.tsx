"use client";

import { motion } from "motion/react";
import { useWorkingHours } from "./hooks/useWorkingHours";

interface HeroClientProps {
	projectsCount: number;
	yearsExperience: number;
	frontendYears: number;
	backendYears: number;
	frontendMonths: number;
	backendMonths: number;
}

const HeroHeading = () => (
	<motion.h1
		className="text-5xl md:text-7xl font-light mb-6"
		initial={{ opacity: 0, y: 50 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1 }}
	>
		<span className="text-accent">FRONTEND</span>
		<br />
		DEVELOPER
	</motion.h1>
);

const HeroBio = () => (
	<motion.p
		className="text-lg md:text-lg max-w-3xl mb-8 text-white/70 font-thin"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.5 }}
	>
		Hi! I'm Koen De Vulder. Aspiring Frontend Composer | Crafting Harmony with
		React | Fueling Curiosity with Coffee.
	</motion.p>
);

const ContactButton = () => (
	<motion.a
		href="#contact"
		className="bg-accent text-black px-8 py-3 font-light"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, delay: 0.8 }}
		whileHover={{
			backgroundColor: "rgba(220, 220, 220, 1)",
			scale: 1.05,
		}}
		whileTap={{
			backgroundColor: "rgba(255, 255, 255, 1)",
			scale: 0.98,
		}}
	>
		CONTACT ME
	</motion.a>
);

interface StatItemProps {
	value: string | number;
	label: string;
	tooltip?: React.ReactNode;
	delay?: number;
}

const StatItem = ({ value, label, tooltip, delay = 1.0 }: StatItemProps) => (
	<motion.div
		className="flex flex-col"
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay }}
	>
		<motion.div className="relative group" whileHover={{ scale: 1.05 }}>
			<span className="text-3xl md:text-4xl text-accent font-light">
				{value}+
			</span>
			{tooltip && (
				<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full right-0 mb-2 p-2 bg-black/80 text-white text-xs rounded w-48">
					{tooltip}
				</div>
			)}
		</motion.div>
		<span className="text-sm text-white/60">{label}</span>
	</motion.div>
);

const HeroStats = ({
	yearsExperience,
	frontendYears,
	backendYears,
	frontendMonths,
	backendMonths,
	projectsCount,
	workHours,
}: {
	yearsExperience: number;
	frontendYears: number;
	backendYears: number;
	frontendMonths: number;
	backendMonths: number;
	projectsCount: number;
	workHours: number;
}) => (
	<div className="absolute bottom-8 right-8 space-y-4 text-right">
		<StatItem
			value={yearsExperience}
			label="Years of Experience"
			tooltip={
				<>
					<p className="font-light">Experience Breakdown:</p>
					<ul className="text-left list-disc pl-4 mt-1 space-y-1">
						<li>
							Frontend: {frontendYears} {frontendYears === 1 ? "year" : "years"}{" "}
							{frontendMonths > 0 &&
								`and ${frontendMonths} ${
									frontendMonths === 1 ? "month" : "months"
								}`}
						</li>
						<li>
							Backend: {backendYears} {backendYears === 1 ? "year" : "years"}{" "}
							{backendMonths > 0 &&
								`and ${backendMonths} ${
									backendMonths === 1 ? "month" : "months"
								}`}
						</li>
					</ul>
				</>
			}
			delay={1.0}
		/>

		<StatItem value={projectsCount} label="Completed Projects" delay={1.1} />

		<StatItem
			value={workHours.toLocaleString("en-US")}
			label="Hours Coded"
			tooltip={
				<>
					<p className="font-light">Based on:</p>
					<ul className="text-left list-disc pl-4 mt-1 space-y-1">
						<li>Started December 2020</li>
						<li>40h work week (Mon-Fri)</li>
						<li>32 days off per year</li>
						<li>Updates hourly</li>
					</ul>
				</>
			}
			delay={1.2}
		/>
	</div>
);

export function HeroClient({
	projectsCount,
	yearsExperience,
	frontendYears,
	backendYears,
	frontendMonths,
	backendMonths,
}: HeroClientProps) {
	// Custom hooks
	const workHours = useWorkingHours();

	return (
		<section
			id="hero"
			className="min-h-screen flex items-center justify-center pt-20 relative"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="flex flex-col items-center md:items-start">
					<HeroHeading />
					<HeroBio />
					<ContactButton />

					<HeroStats
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
		</section>
	);
}
