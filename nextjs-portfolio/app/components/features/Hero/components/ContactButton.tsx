import { motion } from "motion/react";

export function ContactButton() {
	return (
		<motion.a
			href="#contact"
			className="bg-accent text-black px-8 py-3 font-bold"
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
}
