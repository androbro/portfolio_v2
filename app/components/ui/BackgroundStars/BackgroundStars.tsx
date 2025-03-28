"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Helper function to generate random number in a range
const random = (min: number, max: number): number => Math.random() * (max - min) + min;

interface Star {
	id: number;
	x: number; // % position from left
	y: number; // initial y position (usually above screen)
	size: number; // px size
	duration: number; // animation duration in seconds
	delay: number; // animation delay in seconds
}

export const BackgroundStars = ({ numberOfStars = 100 }) => {
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		const generateStars = () => {
			const newStars: Star[] = [];
			for (let i = 0; i < numberOfStars; i++) {
				newStars.push({
					id: i,
					x: random(0, 100),
					y: -10,
					size: random(1, 3),
					duration: random(5, 15),
					delay: random(0, 10),
				});
			}
			setStars(newStars);
		};

		generateStars();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numberOfStars]);

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
			{stars.map((star) => (
				// Use the Motion component with component="div"
				<motion.div
					key={star.id}
					className="absolute bg-white rounded-full"
					style={{
						left: `${star.x}%`,
						top: `${star.y}px`,
						width: `${star.size}px`,
						height: `${star.size}px`,
						opacity: random(0.5, 1.0),
					}}
					initial={{
						y: star.y,
					}}
					animate={{
						y: "100vh",
					}}
					transition={{
						duration: star.duration,
						delay: star.delay,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop", // Motion (and Framer Motion) support this
						ease: "linear",
					}}
				/>
			))}
		</div>
	);
};
