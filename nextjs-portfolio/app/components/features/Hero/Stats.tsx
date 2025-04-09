import { motion } from "motion/react";
import {
	type ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useRef,
} from "react";

interface StatsProps {
	yearsExperience: number;
	frontendYears: number;
	backendYears: number;
	frontendMonths: number;
	backendMonths: number;
	projectsCount: number;
	workHours: number;
}

// Using forwardRef to pass refs from the parent component
export const Stats = forwardRef<HTMLDivElement[], StatsProps>(function Stats(
	{
		yearsExperience,
		frontendYears,
		backendYears,
		frontendMonths,
		backendMonths,
		projectsCount,
		workHours,
	}: StatsProps,
	ref: ForwardedRef<HTMLDivElement[]>,
) {
	// Create internal refs
	const experienceRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const hoursRef = useRef<HTMLDivElement>(null);

	// Expose the refs to the parent component
	useImperativeHandle(
		ref,
		() => {
			const elements: HTMLDivElement[] = [];
			if (experienceRef.current) elements.push(experienceRef.current);
			if (projectsRef.current) elements.push(projectsRef.current);
			if (hoursRef.current) elements.push(hoursRef.current);
			return elements;
		},
		[],
	);

	return (
		<div className="absolute bottom-8 right-8 space-y-4 text-right">
			{/* Experience Stat */}
			<div ref={experienceRef} className="flex flex-col">
				<motion.div className="relative group" whileHover={{ scale: 1.05 }}>
					<span className="text-3xl md:text-4xl text-accent font-light">
						{yearsExperience}+
					</span>
					<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full right-0 mb-2 p-2 bg-black/80 text-white text-xs rounded w-48">
						<p className="font-light">Experience Breakdown:</p>
						<ul className="text-left list-disc pl-4 mt-1 space-y-1">
							<li>
								Frontend: {frontendYears}{" "}
								{frontendYears === 1 ? "year" : "years"}{" "}
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
					</div>
				</motion.div>
				<span className="text-sm text-white/60">Years of Experience</span>
			</div>

			{/* Projects Stat */}
			<div ref={projectsRef} className="flex flex-col">
				<span className="text-3xl md:text-4xl text-accent font-light">
					{projectsCount}+
				</span>
				<span className="text-sm text-white/60">Completed Projects</span>
			</div>

			{/* Hours Stat */}
			<div ref={hoursRef} className="flex flex-col">
				<motion.div className="relative group" whileHover={{ scale: 1.05 }}>
					<span className="text-3xl md:text-4xl text-accent font-light">
						{workHours.toLocaleString("en-US")}+
					</span>
					<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full right-0 mb-2 p-2 bg-black/80 text-white text-xs rounded w-48">
						<p className="font-light">Based on:</p>
						<ul className="text-left list-disc pl-4 mt-1 space-y-1">
							<li>Started December 2020</li>
							<li>40h work week (Mon-Fri)</li>
							<li>32 days off per year</li>
							<li>Updates hourly</li>
						</ul>
					</div>
				</motion.div>
				<span className="text-sm text-white/60">Hours Coded</span>
			</div>
		</div>
	);
});
