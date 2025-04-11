"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
	const sectionRef = useRef<HTMLElement>(null);
	const textContainerRef = useRef<HTMLDivElement>(null);
	const quoteRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Create specific scroll-linked animations for each element
	// Format: [startHidden, animateIn, stayVisible] => [opacity0, opacity1, opacity1]

	// Create specific scroll-linked animations for each element
	// Maps scrollYProgress to opacity and y-position for the quote
	// const quoteOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]); // Opacity changes from 0 to 1 as you scroll down
	// const quoteY = useTransform(scrollYProgress, [0, 0.15, 1], [50, 0, 0]); // Y position moves from 50px down to its final position

	const quoteY = useTransform(scrollYProgress, [0, 0.2, 1], [100, 0, 0]); // Start from 100px down
	const quoteOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]); // Fade in at 20%

	const headingOpacity = useTransform(
		scrollYProgress,
		[0.05, 0.2, 1],
		[0, 1, 1],
	);
	const headingY = useTransform(scrollYProgress, [0.05, 0.2, 1], [30, 0, 0]);

	const aboutMeOpacity = useTransform(
		scrollYProgress,
		[0.1, 0.25, 1],
		[0, 1, 1],
	);
	const aboutMeY = useTransform(scrollYProgress, [0.1, 0.25, 1], [30, 0, 0]);

	const para1Opacity = useTransform(scrollYProgress, [0.15, 0.3, 1], [0, 1, 1]);
	const para1Y = useTransform(scrollYProgress, [0.15, 0.3, 1], [30, 0, 0]);

	const para2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 1], [0, 1, 1]);
	const para2Y = useTransform(scrollYProgress, [0.2, 0.35, 1], [30, 0, 0]);

	const para3Opacity = useTransform(scrollYProgress, [0.25, 0.4, 1], [0, 1, 1]);
	const para3Y = useTransform(scrollYProgress, [0.25, 0.4, 1], [30, 0, 0]);

	return (
		<div id="about" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
					<div ref={quoteRef}>
						<motion.h3
							className="text-4xl md:text-6xl font-light mb-22"
							style={{
								opacity: quoteOpacity,
								y: quoteY,
							}}
						>
							I create meaningful digital experiences that combine aesthetics
							with functionality and performance.
						</motion.h3>
					</div>

					<div
						ref={textContainerRef}
						className="grid grid-cols-1 gap-8 text-lg text-white/80"
					>
						<motion.p
							className="pb-3 border-b text-muted-foreground"
							style={{
								opacity: aboutMeOpacity,
								y: aboutMeY,
							}}
						>
							About Me
						</motion.p>

						<div className="flex flex-col md:flex-row gap-8">
							<div className="md:w-1/3">
								<motion.h4
									className="text-2xl font-light mb-4"
									style={{
										opacity: headingOpacity,
										y: headingY,
									}}
								>
									Hi, I'm Koen.
								</motion.h4>
							</div>
							<div className="md:w-2/3 space-y-6">
								<motion.p
									className="font-light"
									style={{
										opacity: para1Opacity,
										y: para1Y,
									}}
								>
									I'm a frontend developer with experience in building web and
									mobile applications using React, React Native, and Angular. My
									work focuses on creating responsive and user-friendly
									interfaces.
								</motion.p>
								<motion.p
									className="font-light"
									style={{
										opacity: para2Opacity,
										y: para2Y,
									}}
								>
									I prioritize delivering optimal user experiences by
									considering the audience's needs and project requirements.
									Currently, I'm expanding my expertise in React and JavaScript
									to become a full-stack React developer and mentor others in
									the tech community.
								</motion.p>
								<motion.p
									className="font-light"
									style={{
										opacity: para3Opacity,
										y: para3Y,
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
