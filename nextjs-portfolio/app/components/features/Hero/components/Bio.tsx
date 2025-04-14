import { motion } from "motion/react";

export function Bio() {
	return (
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
}
