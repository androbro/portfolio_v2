"use client";

import { AsterixIcon, JavaScript } from "@/app/assets/icons";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Define tech stack categories and items
const techStack = {
	frontend: [
		{ name: "HTML", icon: "🌐" },
		{ name: "CSS", icon: "🎨" },
		{ name: "JavaScript", Icon: JavaScript },
		{ name: "TypeScript", icon: "📝" },
		{ name: "React", icon: "⚛️" },
		{ name: "Next.js", icon: "🔲" },
		{ name: "Redux", icon: "🔄" },
		{ name: "Tailwind CSS", icon: "💨" },
		{ name: "GSAP", icon: "✨" },
		{ name: "Motion", icon: "🎭" },
		{ name: "SASS", icon: "💅" },
	],
	backend: [
		{ name: "Node.js", icon: "🟢" },
		{ name: "Express.js", icon: "🚂" },
		{ name: "Firebase", icon: "🔥" },
		{ name: "RESTful APIs", icon: "🔌" },
	],
	database: [
		{ name: "MongoDB", icon: "🍃" },
		{ name: "MySQL", icon: "🐬" },
		{ name: "Supabase", icon: "⚡" },
	],
	tools: [
		{ name: "Git", icon: "🔄" },
		{ name: "GitHub", icon: "🐙" },
		{ name: "VS Code", icon: "📝" },
		{ name: "Figma", icon: "🎨" },
		{ name: "Jest", icon: "🃏" },
		{ name: "Webpack", icon: "📦" },
		{ name: "Vite", icon: "⚡" },
	],
};

export function TechStack() {
	const sectionRef = useRef<HTMLElement>(null);
	
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	
	// Create scroll-linked animations
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);
	const titleY = useTransform(scrollYProgress, [0, 0.1, 1], [50, 0, 0]);
	
	// Create animations for the tech categories
	const frontendOpacity = useTransform(scrollYProgress, [0.1, 0.2, 1], [0, 1, 1]);
	const frontendY = useTransform(scrollYProgress, [0.1, 0.2, 1], [30, 0, 0]);
	
	const backendOpacity = useTransform(scrollYProgress, [0.15, 0.25, 1], [0, 1, 1]);
	const backendY = useTransform(scrollYProgress, [0.15, 0.25, 1], [30, 0, 0]);
	
	const databaseOpacity = useTransform(scrollYProgress, [0.2, 0.3, 1], [0, 1, 1]);
	const databaseY = useTransform(scrollYProgress, [0.2, 0.3, 1], [30, 0, 0]);
	
	const toolsOpacity = useTransform(scrollYProgress, [0.25, 0.35, 1], [0, 1, 1]);
	const toolsY = useTransform(scrollYProgress, [0.25, 0.35, 1], [30, 0, 0]);
	
	// Create a progress circle animation
	const progressPathLength = scrollYProgress;

	return (
		<section ref={sectionRef} id="skills" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">					
					<div className="flex items-center gap-4 mb-16">
						<motion.div
							className="w-10 h-10 text-accent flex items-center justify-center"
							animate={{
								rotate: 360
							}}
							transition={{
								duration: 6,
								repeat: Infinity,
								ease: "linear"
							}}
						>
							<AsterixIcon />
						</motion.div>
						<motion.h2
							className="text-2xl uppercase"
							style={{
								opacity: titleOpacity,
								y: titleY
							}}
						>
							My Tech Stack
						</motion.h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
						{/* Frontend */}
						<motion.div 
							className="tech-category tech-category-0"
							style={{
								opacity: frontendOpacity,
								y: frontendY
							}}
						>
							<h3 className="text-2xl font-light mb-6 text-accent">Frontend</h3>
							<div className="grid grid-cols-2 gap-4">
								{techStack.frontend.map((tech, index) => (
									<motion.div 
										key={tech.name} 
										className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
										style={{
											opacity: useTransform(
												scrollYProgress, 
												[0.15 + index * 0.01, 0.25 + index * 0.01, 1], 
												[0, 1, 1]
											)
										}}
									>
										{tech.Icon ? (
											<tech.Icon className="w-6 h-6" />
										) : (
											<span className="text-2xl">{tech.icon}</span>
										)}
										<span className="text-lg font-light">{tech.name}</span>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Backend */}
						<motion.div 
							className="tech-category tech-category-1"
							style={{
								opacity: backendOpacity,
								y: backendY
							}}
						>
							<h3 className="text-2xl font-light mb-6 text-accent">Backend</h3>
							<div className="grid grid-cols-2 gap-4">
								{techStack.backend.map((tech, index) => (
									<motion.div 
										key={tech.name} 
										className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
										style={{
											opacity: useTransform(
												scrollYProgress, 
												[0.2 + index * 0.01, 0.3 + index * 0.01, 1], 
												[0, 1, 1]
											)
										}}
									>
										<span className="text-2xl">{tech.icon}</span>
										<span className="text-lg font-light">{tech.name}</span>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Database */}
						<motion.div 
							className="tech-category tech-category-2"
							style={{
								opacity: databaseOpacity,
								y: databaseY
							}}
						>
							<h3 className="text-2xl font-light mb-6 text-accent">Database</h3>
							<div className="grid grid-cols-2 gap-4">
								{techStack.database.map((tech, index) => (
									<motion.div 
										key={tech.name} 
										className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
										style={{
											opacity: useTransform(
												scrollYProgress, 
												[0.25 + index * 0.01, 0.35 + index * 0.01, 1], 
												[0, 1, 1]
											)
										}}
									>
										<span className="text-2xl">{tech.icon}</span>
										<span className="text-lg font-light">{tech.name}</span>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Tools */}
						<motion.div 
							className="tech-category tech-category-3"
							style={{
								opacity: toolsOpacity,
								y: toolsY
							}}
						>
							<h3 className="text-2xl font-light mb-6 text-accent">Tools</h3>
							<div className="grid grid-cols-2 gap-4">
								{techStack.tools.map((tech, index) => (
									<motion.div 
										key={tech.name} 
										className="tech-item flex items-center gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
										style={{
											opacity: useTransform(
												scrollYProgress, 
												[0.3 + index * 0.01, 0.4 + index * 0.01, 1], 
												[0, 1, 1]
											)
										}}
									>
										<span className="text-2xl">{tech.icon}</span>
										<span className="text-lg font-light">{tech.name}</span>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
