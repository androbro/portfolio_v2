import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "motion/react";
import { useRef } from "react";

interface HeaderProps {
	scrollYProgress: MotionValue<number>;
}

export function Header({ scrollYProgress }: HeaderProps) {
	const quoteRef = useRef<HTMLDivElement>(null);

	// Create scroll-linked animations with useTransform
	const headerOpacity = useTransform(
		scrollYProgress,
		[0, 0.1, 0.25],
		[0, 0.5, 1],
	);
	const headerY = useTransform(scrollYProgress, [0, 0.1, 0.25], [50, 25, 0]);

	return (
		<motion.div
			ref={quoteRef}
			style={{
				opacity: headerOpacity,
				y: headerY,
			}}
		>
			<h3 className="text-4xl md:text-6xl font-light mb-22">
				I create meaningful digital experiences that combine aesthetics with
				functionality and performance.
			</h3>
		</motion.div>
	);
}
