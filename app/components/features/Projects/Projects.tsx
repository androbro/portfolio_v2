"use client";

import { motion } from "framer-motion";

const projects = [
	{
		title: "E-commerce Platform",
		description: "A modern e-commerce solution built with Next.js and Stripe",
		link: "#",
		tech: "Next.js, TypeScript, Stripe",
	},
	{
		title: "Task Management App",
		description: "Real-time task management with collaborative features",
		link: "#",
		tech: "React, Firebase, TailwindCSS",
	},
	{
		title: "Portfolio Website",
		description: "Personal portfolio with smooth animations and interactions",
		link: "#",
		tech: "Next.js, GSAP, Framer Motion",
	},
];

export function Projects() {
	return (
		<section id="projects" className="min-h-screen flex items-center py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl">
					<div className="flex items-center gap-4 mb-16">
						<span className="text-accent text-5xl">*</span>
						<motion.h2
							className="text-2xl uppercase"
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: false }}
						>
							Selected Projects
						</motion.h2>
					</div>

					<div className="space-y-12">
						{projects.map((project, index) => (
							<motion.div
								key={project.title}
								className="group"
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								viewport={{ once: false }}
							>
								<div className="flex flex-col gap-4 mb-2">
									<h3 className="text-4xl md:text-5xl font-normal group-hover:text-accent transition-colors">
										{project.title}
									</h3>
									<p className="text-xl text-white/80">{project.description}</p>
									<span className="text-white/60">{project.tech}</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
