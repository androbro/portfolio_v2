import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";
import { Bio } from "./Bio";

interface ContentProps {
	scrollYProgress: MotionValue<number>;
}

export function Content({ scrollYProgress }: ContentProps) {
	const textContainerRef = useRef<HTMLDivElement>(null);

	// Create scroll-linked animations with useTransform
	const textOpacity = useTransform(
		scrollYProgress,
		[0.05, 0.15, 0.3],
		[0, 0.5, 1],
	);
	const textY = useTransform(scrollYProgress, [0.05, 0.15, 0.3], [50, 25, 0]);

	return (
		<div
			ref={textContainerRef}
			className="grid grid-cols-1 gap-8 text-lg text-white/80"
		>
			<motion.p
				className="pb-3 border-b text-muted-foreground"
				style={{
					opacity: textOpacity,
					y: textY,
				}}
			>
				About Me
			</motion.p>

			<div className="flex flex-col md:flex-row gap-8">
				<div className="md:w-1/3">
					<motion.h4
						className="text-2xl font-light mb-4"
						style={{
							opacity: textOpacity,
							y: textY,
						}}
					>
						Hi, I'm Koen.
					</motion.h4>
				</div>

				<Bio scrollYProgress={scrollYProgress} />
			</div>
		</div>
	);
}
