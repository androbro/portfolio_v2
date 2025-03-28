"use client";

import { motion } from "motion/react";

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
	return (
		<section id="experience" className="flex items-center justify-center py-20">
			<div className="content-container">
				<div className="flex items-center gap-4 mb-16">
					<span className="text-accent text-5xl">*</span>
					<motion.h2
						className="text-2xl uppercase"
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: false }}
					>
						Work Experience
					</motion.h2>
				</div>

				<div className="space-y-12">
					{experiences.map((exp, index) => (
						<motion.div
							key={exp.company}
							className="group border-b border-white/10 pb-12 last:border-0"
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							viewport={{ once: false }}
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
					))}
				</div>
			</div>
		</section>
	);
}
