"use client";

import { motion } from "motion/react";

interface ScrollArrowProps {
	duration?: number;
	className?: string;
	strokeColor?: string;
	fillColor?: string;
}

export function ScrollArrow({
	duration = 7,
	className = "absolute bottom-20 left-1/2 -translate-x-1/2 z-0",
	strokeColor = "#2C2C2C",
	fillColor = "#2C2C2C",
}: ScrollArrowProps) {
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
				duration,
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
				duration,
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
		<motion.svg
			id="banner-arrow-svg"
			width="376"
			height="111"
			viewBox="0 0 376 111"
			fill="transparent"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			initial={svgContainerAnimation.initial}
			animate={svgContainerAnimation.animate}
			aria-labelledby="arrow-title"
		>
			<title id="arrow-title">Scroll down arrow</title>
			<motion.path
				className="svg-arrow svg-arrow-1"
				d="M1 1V39.9286L188 110V70.6822L1 1Z"
				stroke={strokeColor}
				fill={fillColor}
				initial={pathAnimation.initial}
				animate={pathAnimation.animate}
			/>
			<motion.path
				className="svg-arrow svg-arrow-2"
				d="M375 1V39.9286L188 110V70.6822L375 1Z"
				stroke={strokeColor}
				fill={fillColor}
				initial={pathAnimation.initial}
				animate={pathAnimation.animate}
			/>
		</motion.svg>
	);
}
