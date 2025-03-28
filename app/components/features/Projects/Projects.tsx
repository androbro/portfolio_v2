"use client";

import { motion } from "motion/react";

const projects = [
	{
		title: "E-commerce Web App",
		description: "A fully responsive e-commerce platform built with Next.js and Stripe.",
		year: "2023",
	},
	{
		title: "Portfolio Website",
		description: "A creative portfolio website for a digital agency.",
		year: "2023",
	},
	{
		title: "SaaS Dashboard",
		description: "An analytics dashboard for a SaaS product using React and D3.js.",
		year: "2022",
	},
	{
		title: "Task Management App",
		description: "A collaborative task management application with real-time updates.",
		year: "2022",
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
							My Projects
						</motion.h2>
					</div>

					<div className="space-y-12">
						{projects.map((project, index) => (
							<motion.div
								key={project.title}
								className="border-b border-white/10 pb-12 last:border-0 group"
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								viewport={{ once: false }}
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
									<h3 className="text-4xl md:text-5xl font-light group-hover:text-accent transition-colors">
										{project.title}
									</h3>
									<span className="text-white/60">{project.year}</span>
								</div>
								<p className="text-white/80 max-w-2xl">{project.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
