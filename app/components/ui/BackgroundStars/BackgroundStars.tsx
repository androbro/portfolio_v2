"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StarProps {
	delay: number;
	index: number;
}

const Star = ({ delay, index }: StarProps) => {
	const x = Math.random() * 100;
	const size = 1 + Math.random() * 2;
	const duration = 10 + Math.random() * 20;

	return (
		<motion.div
			key={index}
			className="absolute rounded-full bg-white"
			style={{
				width: `${size}px`,
				height: `${size}px`,
				left: `${x}%`,
				top: "-5px",
			}}
			initial={{ opacity: 0 }}
			animate={{
				opacity: [0, 1, 1, 0],
				y: ["0vh", "100vh"],
			}}
			transition={{
				duration,
				ease: "linear",
				repeat: Number.POSITIVE_INFINITY,
				delay,
			}}
		/>
	);
};

export function BackgroundStars() {
	const [stars, setStars] = useState<number[]>([]);

	useEffect(() => {
		// Create 50 stars
		setStars(Array.from({ length: 50 }, (_, i) => i));
	}, []);

	return (
		<motion.div
			className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[hsl(0,0%,24%)]"
			aria-hidden="true"
		>
			{stars.map((_, i) => (
				<Star key={i} index={i} delay={Math.random() * 10} />
			))}
		</motion.div>
	);
}
