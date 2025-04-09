"use client";

import { AsterixIcon } from "@/app/assets/icons";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const experiences = [
	{
		company: "Freelance",
		position: "Frontend Developer",
		period: "Jan 2023 - Present",
		description: "Building responsive and interactive web applications for various clients using React, Next.js, and modern frontend technologies."
	},
	{
		company: "WebDev Agency",
		position: "Junior Frontend Developer",
		period: "Mar 2022 - Dec 2022",
		description: "Developed UI components and implemented responsive designs for client websites. Collaborated with design and backend teams to deliver complete web solutions."
	},
	{
		company: "TechStart Studio",
		position: "Frontend Intern",
		period: "Sep 2021 - Feb 2022",
		description: "Assisted in building user interfaces for web applications, learned industry best practices, and gained hands-on experience with modern frontend frameworks."
	}
];

export function Experience() {
	const sectionRef = useRef<HTMLElement>(null);
	
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	
	// Create scroll-linked animations
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);
	const titleY = useTransform(scrollYProgress, [0, 0.1, 1], [50, 0, 0]);

	return (
		<section ref={sectionRef} id="experience" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">					
					<div className="flex items-center gap-4 mb-16">
						<motion.div
							className="text-accent" 
							animate={{
								rotate: 360
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								ease: "linear"
							}}
						>
							<AsterixIcon className="w-8 h-8" />
						</motion.div>
						<motion.h2
							className="text-2xl uppercase"
							style={{
								opacity: titleOpacity,
								y: titleY
							}}
						>
							Work Experience
						</motion.h2>
					</div>

					<div className="space-y-12">
						{experiences.map((exp, index) => {
							// Create staggered animations for each experience item
							const itemOpacity = useTransform(
								scrollYProgress, 
								[0.1 + index * 0.05, 0.2 + index * 0.05, 1], 
								[0, 1, 1]
							);
							const itemY = useTransform(
								scrollYProgress, 
								[0.1 + index * 0.05, 0.2 + index * 0.05, 1], 
								[50, 0, 0]
							);
							
							return (
								<motion.div
									key={exp.company}
									className="group border-b border-white/10 pb-12 last:border-0"
									style={{
										opacity: itemOpacity,
										y: itemY
									}}
								>
									<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
										<h3 className="text-4xl md:text-5xl font-light group-hover:text-accent transition-colors">
											{exp.position}
										</h3>
										<span className="text-white/60">{exp.period}</span>
									</div>
									<span className="text-xl text-white/80 mb-4 block">{exp.company}</span>
									<p className="text-white/70 max-w-3xl font-light">{exp.description}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
