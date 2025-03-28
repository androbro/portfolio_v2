"use client";

import { motion } from "motion/react";

const experiences = [
	{
		company: "Strativ AB",
		position: "Software Engineer (Frontend)",
		period: "Dec 2024 - Present",
	},
	{
		company: "Epikcoders",
		position: "Frontend Developer",
		period: "Oct 2023 - Nov 2024",
	},
	{
		company: "Anchorblock Technology",
		position: "Frontend Engineer",
		period: "Oct 2022 - Sep 2023",
	},
	{
		company: "Branex IT",
		position: "Frontend Developer (Part-time)",
		period: "Jan 2022 - Oct 2022",
	},
];

export function Experience() {
	return (
		<section id="experience" className="min-h-screen flex items-center py-20">
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
							My Experience
						</motion.h2>
					</div>

					<div className="space-y-12">
						{experiences.map((exp, index) => (
							<motion.div
								key={exp.company}
								className="group"
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								viewport={{ once: false }}
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
									<h3 className="text-4xl md:text-5xl font-normal group-hover:text-accent transition-colors">
										{exp.position}
									</h3>
									<span className="text-white/60">{exp.period}</span>
								</div>
								<span className="text-xl text-white/80">{exp.company}</span>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
