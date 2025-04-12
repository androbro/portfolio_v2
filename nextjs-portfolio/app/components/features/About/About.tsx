"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const textContainerRef = useRef<HTMLDivElement>(null);
	const quoteRef = useRef<HTMLDivElement>(null);

	// Use useScroll to get scroll progress for this section
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Create scroll-linked animations with useTransform
	// Format: [start, inView, fullView] => [hidden, partially visible, fully visible]
	const headerOpacity = useTransform(
		scrollYProgress,
		[0, 0.1, 0.25],
		[0, 0.5, 1],
	);
	const headerY = useTransform(scrollYProgress, [0, 0.1, 0.25], [50, 25, 0]);

	const textOpacity = useTransform(
		scrollYProgress,
		[0.05, 0.15, 0.3],
		[0, 0.5, 1],
	);
	const textY = useTransform(scrollYProgress, [0.05, 0.15, 0.3], [50, 25, 0]);

	const p1Opacity = useTransform(
		scrollYProgress,
		[0.1, 0.25, 0.4],
		[0, 0.5, 1],
	);
	const p1Y = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [50, 25, 0]);

	const p2Opacity = useTransform(
		scrollYProgress,
		[0.15, 0.3, 0.45],
		[0, 0.5, 1],
	);
	const p2Y = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [50, 25, 0]);

	const p3Opacity = useTransform(
		scrollYProgress,
		[0.2, 0.35, 0.5],
		[0, 0.5, 1],
	);
	const p3Y = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [50, 25, 0]);

	return (
		<div
			id="about"
			className="flex items-center justify-center py-20"
			ref={sectionRef}
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
					{/* header */}
					<motion.div
						ref={quoteRef}
						style={{
							opacity: headerOpacity,
							y: headerY,
						}}
					>
						<h3 className="text-4xl md:text-6xl font-light mb-22">
							I create meaningful digital experiences that combine aesthetics
							with functionality and performance.
						</h3>
					</motion.div>

					{/* text container */}
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
							{/* heading */}
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

							{/* text */}
							<div className="md:w-2/3 space-y-6">
								{/* paragraph 1 */}
								<motion.p
									className="font-light"
									style={{
										opacity: p1Opacity,
										y: p1Y,
									}}
								>
									I'm a frontend developer with experience in building web and
									mobile applications using React, React Native, and Angular. My
									work focuses on creating responsive and user-friendly
									interfaces.
								</motion.p>

								{/* paragraph 2 */}
								<motion.p
									className="font-light"
									style={{
										opacity: p2Opacity,
										y: p2Y,
									}}
								>
									I prioritize delivering optimal user experiences by
									considering the audience's needs and project requirements.
									Currently, I'm expanding my expertise in React and JavaScript
									to become a full-stack React developer and mentor others in
									the tech community.
								</motion.p>

								{/* paragraph 3 */}
								<motion.p
									className="font-light"
									style={{
										opacity: p3Opacity,
										y: p3Y,
									}}
								>
									Beyond coding, I enjoy playing the piano, baking, cooking, and
									gaming. I also stay updated with the latest tech developments
									by watching YouTube and following tech news.
								</motion.p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
