import { AsterixIcon } from "@/app/assets/icons";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function SectionTitle({ title }: { title: string }) {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);
	const titleY = useTransform(scrollYProgress, [0, 0.1, 1], [50, 0, 0]);
	return (
		<div className="flex items-center gap-4 mb-16">
			<motion.div
				className="text-accent"
				animate={{
					rotate: 360,
				}}
				transition={{
					duration: 6,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			>
				<AsterixIcon className="w-8 h-8" />
			</motion.div>
			<motion.h2
				className="text-2xl uppercase"
				style={{
					opacity: titleOpacity,
					y: titleY,
				}}
			>
				{title}
			</motion.h2>
		</div>
	);
}
