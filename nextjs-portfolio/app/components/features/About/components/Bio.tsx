import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "motion/react";

interface BioProps {
	scrollYProgress: MotionValue<number>;
}

export function Bio({ scrollYProgress }: BioProps) {
	// Create scroll-linked animations with useTransform
	const p1Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 0.5, 1]);
	const p1Y = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [50, 25, 0]);

	const p2Opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 0.5, 1]);
	const p2Y = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [50, 25, 0]);

	const p3Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 0.5, 1]);
	const p3Y = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [50, 25, 0]);

	return (
		<div className="md:w-2/3 space-y-6">
			<motion.p
				className="font-light"
				style={{
					opacity: p1Opacity,
					y: p1Y,
				}}
			>
				I'm a frontend developer with experience in building web and mobile applications using
				React, React Native, and Angular. My work focuses on creating responsive and user-friendly
				interfaces.
			</motion.p>

			<motion.p
				className="font-light"
				style={{
					opacity: p2Opacity,
					y: p2Y,
				}}
			>
				I prioritize delivering optimal user experiences by considering the audience's needs and
				project requirements. Currently, I'm expanding my expertise in React and JavaScript to
				become a full-stack React developer and mentor others in the tech community.
			</motion.p>

			<motion.p
				className="font-light"
				style={{
					opacity: p3Opacity,
					y: p3Y,
				}}
			>
				Beyond coding, I enjoy playing the piano, baking, cooking, and gaming. I also stay updated
				with the latest tech developments by watching YouTube and following tech news.
			</motion.p>
		</div>
	);
}
