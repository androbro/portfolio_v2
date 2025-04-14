import { motion } from "motion/react";

export function Heading() {
	return (
		<>
			<motion.h1
				className="text-5xl md:text-7xl font-bold"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<span className="text-accent">FRONTEND</span>
			</motion.h1>
			<motion.h1
				className="text-5xl md:text-7xl font-bold mb-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
			>
				<span className="ml-4">DEVELOPER</span>
			</motion.h1>
		</>
	);
}
