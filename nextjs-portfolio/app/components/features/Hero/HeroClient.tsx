"use client";

import { gsap } from "gsap";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Calculate the number of working hours since July 2022
 * Assumes 8-hour workdays (Mon-Fri), 32 days off per year
 * Updates hourly
 */
const calculateWorkingHours = (): number => {
	// Start date: July 1, 2022
	const startDate = new Date(2020, 11, 20);
	const currentDate = new Date();

	// Calculate total days between dates
	const totalDays = Math.floor(
		(currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	// Calculate number of weeks
	const totalWeeks = Math.floor(totalDays / 7);

	// Calculate weekdays (5 per week) plus remaining weekdays
	const weekdaysFromCompleteWeeks = totalWeeks * 5;

	// Calculate remaining days
	const remainingDays = totalDays % 7;
	let startDayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
	if (startDayOfWeek === 0) startDayOfWeek = 7; // Adjust Sunday to be 7

	// Count remaining weekdays
	let extraWeekdays = 0;
	for (let i = 0; i < remainingDays; i++) {
		const currentDayOfWeek = (startDayOfWeek + i) % 7;
		// Count Monday (1) through Friday (5)
		if (currentDayOfWeek >= 1 && currentDayOfWeek <= 5) {
			extraWeekdays++;
		}
	}

	// Total weekdays
	const totalWeekdays = weekdaysFromCompleteWeeks + extraWeekdays;

	// Subtract vacation days (32 days per year)
	const yearsWorked = Math.floor(totalDays / 365);
	const remainingDaysInYear = totalDays % 365;

	// Prorated vacation days
	const vacationDays =
		yearsWorked * 32 + Math.floor((remainingDaysInYear / 365) * 32);

	// Final working days
	const workingDays = totalWeekdays - vacationDays;

	// Hours worked (8 hours per day)
	const hoursWorked = workingDays * 8;

	// Add current day hours if it's a weekday and during working hours
	if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
		const currentHour = currentDate.getHours();
		if (currentHour >= 9 && currentHour < 17) {
			// 9 AM to 5 PM
			const extraHours = currentHour - 9;
			return hoursWorked + extraHours;
		}
	}

	return hoursWorked;
};

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
	const headingRef = useRef<HTMLHeadingElement>(null);
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const experienceRef = useRef<HTMLDivElement>(null);
	const projectsRef = useRef<HTMLDivElement>(null);
	const hoursRef = useRef<HTMLDivElement>(null);
	const [workHours, setWorkHours] = useState<number>(calculateWorkingHours());

	// GSAP animations
	useEffect(() => {
		// GSAP animation for text fade-in
		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		tl.fromTo(
			headingRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1 },
		)
			.fromTo(
				paragraphRef.current,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8 },
				"-=0.4",
			)
			.fromTo(
				[experienceRef.current, projectsRef.current, hoursRef.current],
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
				"-=0.3",
			);
	}, []);

	// Update work hours every hour
	useEffect(() => {
		const updateHours = () => {
			setWorkHours(calculateWorkingHours());
		};

		// Update immediately and then every hour
		updateHours();
		const interval = setInterval(updateHours, 1000 * 60 * 60);

		return () => clearInterval(interval);
	}, []);

	return (
		<section
			id="hero"
			className="min-h-screen flex items-center justify-center pt-20 relative"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="flex flex-col items-center md:items-start">
					<h1 ref={headingRef} className="text-5xl md:text-7xl font-light mb-6">
						<span className="text-accent">FRONTEND</span>
						<br />
						DEVELOPER
					</h1>
					<p
						ref={paragraphRef}
						className="text-lg md:text-lg max-w-3xl mb-8 text-white/70 font-thin"
					>
						Hi! I'm Koen De Vulder. Aspiring Frontend Composer | Crafting
						Harmony with React | Fueling Curiosity with Coffee.
					</p>
					<motion.a
						href="#contact"
						className="bg-accent text-black px-8 py-3 font-light"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
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

					{/* Stats */}
					<div className="absolute bottom-8 right-8 space-y-4 text-right">
						<div ref={experienceRef} className="flex flex-col">
							<motion.div
								className="relative group"
								whileHover={{ scale: 1.05 }}
							>
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
												`and ${frontendMonths} ${frontendMonths === 1 ? "month" : "months"}`}
										</li>
										<li>
											Backend: {backendYears}{" "}
											{backendYears === 1 ? "year" : "years"}{" "}
											{backendMonths > 0 &&
												`and ${backendMonths} ${backendMonths === 1 ? "month" : "months"}`}
										</li>
									</ul>
								</div>
							</motion.div>
							<span className="text-sm text-white/60">Years of Experience</span>
						</div>
						<div ref={projectsRef} className="flex flex-col">
							<span className="text-3xl md:text-4xl text-accent font-light">
								{projectsCount}+
							</span>
							<span className="text-sm text-white/60">Completed Projects</span>
						</div>
						<div ref={hoursRef} className="flex flex-col">
							<motion.div
								className="relative group"
								whileHover={{ scale: 1.05 }}
							>
								<span className="text-3xl md:text-4xl text-accent font-light">
									{workHours.toLocaleString("en-US")}+
								</span>
								<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full right-0 mb-2 p-2 bg-black/80 text-white text-xs rounded w-48">
									<p className="font-light">Based on:</p>
									<ul className="text-left list-disc pl-4 mt-1 space-y-1">
										<li>Started July 2022</li>
										<li>40h work week (Mon-Fri)</li>
										<li>32 days off per year</li>
										<li>Updates hourly</li>
									</ul>
								</div>
							</motion.div>
							<span className="text-sm text-white/60">Hours Coded</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
