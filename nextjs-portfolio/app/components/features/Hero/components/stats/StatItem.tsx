import { motion } from "motion/react";

interface StatItemProps {
	value: string | number;
	label: string;
	tooltip?: React.ReactNode;
	delay?: number;
}

export function StatItem({ value, label, tooltip, delay = 1.0 }: StatItemProps) {
	return (
		<motion.div
			className="flex flex-col items-center text-center md:items-end"
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay }}
		>
			<motion.div className="relative group" whileHover={{ scale: 1.05 }}>
				<span className="text-4xl md:text-5xl text-accent font-bold">{value}+</span>
				{tooltip && (
					<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 mb-2 p-2 bg-black/80 text-white text-xs rounded w-48">
						{tooltip}
					</div>
				)}
			</motion.div>
			<span className="text-sm text-white/60 w-full">{label}</span>
		</motion.div>
	);
}
