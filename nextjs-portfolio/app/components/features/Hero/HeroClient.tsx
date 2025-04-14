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

	// Animation parameters for easy customization
	const animationDuration = 7; // Total animation duration in seconds

	// Timeline keyframes (0-1 values)
	const timelineKeys = {
		fadeIn: 0.15, // When fade in completes
		drawOutline: 0.3, // When outline drawing completes
		stayVisible: 0.6, // How long to stay visible at top
		moveDown: 0.75, // When move down and fade out completes
	};

	// SVG container animation
	const svgContainerAnimation = {
		initial: { opacity: 0, y: 0 },
		animate: {
			opacity: [0, 1, 1, 1, 0],
			y: [0, 0, 0, 100, 100],
			transition: {
				duration: animationDuration,
				times: [
					0,
					timelineKeys.fadeIn,
					timelineKeys.stayVisible,
					timelineKeys.moveDown,
					1,
				],
				ease: ["easeIn", "linear", "linear", "easeOut", "linear"],
				repeat: Number.POSITIVE_INFINITY,
			},
		},
	};

	// Path outline drawing animation
	const pathAnimation = {
		initial: { pathLength: 0, fillOpacity: 0 },
		animate: {
			pathLength: [0, 1, 1, 1, 0],
			fillOpacity: [0, 0, 0.9, 0.9, 0],
			transition: {
				duration: animationDuration,
				times: [
					0,
					timelineKeys.drawOutline,
					timelineKeys.stayVisible,
					timelineKeys.moveDown,
					1,
				],
				ease: "easeInOut",
				repeat: Number.POSITIVE_INFINITY,
			},
		},
	};

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
				initial={svgContainerAnimation.initial}
				animate={svgContainerAnimation.animate}
				aria-labelledby="arrow-title"
			>
				<title id="arrow-title">Scroll down arrow</title>
				<motion.path
					className="svg-arrow svg-arrow-1"
					d="M1 1V39.9286L188 110V70.6822L1 1Z"
					stroke="#2C2C2C"
					fill="#2C2C2C"
					initial={pathAnimation.initial}
					animate={pathAnimation.animate}
				/>
				<motion.path
					className="svg-arrow svg-arrow-2"
					d="M375 1V39.9286L188 110V70.6822L375 1Z"
					stroke="#2C2C2C"
					fill="#2C2C2C"
					initial={pathAnimation.initial}
					animate={pathAnimation.animate}
				/>
			</motion.svg>
		</div>
	);
}
