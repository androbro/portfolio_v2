"use client";

import { AsterixIcon } from "@/app/assets/icons";
import { motion } from "motion/react";
import { useState } from "react";

// Tech stack data structured in categories
const techStackData = {
	frontend: [
		{ name: "Javascript", initials: "JS", color: "bg-yellow-500", textColor: "text-black" },
		{ name: "Typescript", initials: "TS", color: "bg-blue-500", textColor: "text-white" },
		{ name: "React", initials: "⚛️", color: "bg-blue-400", textColor: "text-white" },
		{ name: "Next.JS", initials: "N", color: "bg-black", textColor: "text-white" },
		{ name: "Redux", initials: "R", color: "bg-purple-500", textColor: "text-white" },
		{ name: "Tailwind CSS", initials: "T", color: "bg-blue-300", textColor: "text-white" },
		{ name: "GSAP", initials: "G", color: "bg-green-500", textColor: "text-white" },
		{ name: "Frammer Motion", initials: "FM", color: "bg-purple-600", textColor: "text-white" },
		{ name: "SASS", initials: "S", color: "bg-pink-500", textColor: "text-white" },
		{ name: "Bootstrap", initials: "B", color: "bg-purple-800", textColor: "text-white" },
	],
	backend: [
		{ name: "Node.JS", initials: "N", color: "bg-green-600", textColor: "text-white" },
		{ name: "Nest.JS", initials: "N", color: "bg-red-500", textColor: "text-white" },
		{ name: "Express.Js", initials: "EX", color: "bg-gray-200", textColor: "text-black" },
	],
	database: [
		{ name: "MySQL", initials: "M", color: "bg-blue-600", textColor: "text-white" },
		{ name: "PostgreSQL", initials: "P", color: "bg-blue-400", textColor: "text-white" },
		{ name: "MongoDB", initials: "M", color: "bg-green-500", textColor: "text-white" },
		{ name: "Prisma", initials: "P", color: "bg-gray-700", textColor: "text-white" },
	],
	tools: [
		{ name: "Git", initials: "G", color: "bg-red-500", textColor: "text-white" },
		{ name: "Docker", initials: "D", color: "bg-blue-600", textColor: "text-white" },
		{ name: "AWS", initials: "A", color: "bg-gray-600", textColor: "text-orange-300" },
	]
};

export function TechStack() {
	const [techStack, setTechStack] = useState(techStackData);
	
	// Function to render a category section
	const renderCategory = (category: string, techs: any[]) => {
		return (
			<div key={category} className="mb-20">
				<div className="flex flex-col md:flex-row">
					{/* Text on the left */}
					<div className="md:w-1/3 mb-8 md:mb-0">
						<h3 className="text-5xl font-bold text-gray-400 uppercase sticky top-20">
							{category}
						</h3>
					</div>
					
					{/* Icons on the right */}
					<div className="md:w-2/3">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{techs.map((tech, index) => (
								<motion.div 
									key={`${category}-${tech.name}`}
									className="flex flex-col items-center"
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ 
										opacity: 1, 
										x: 0,
										transition: { 
											duration: 0.5, 
											delay: index * 0.1
										}
									}}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05 }}
								>
									<div className={`${tech.color} ${tech.textColor} w-16 h-16 rounded-md flex items-center justify-center mb-2`}>
										<span className="text-3xl">{tech.initials}</span>
									</div>
									<span>{tech.name}</span>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<section id="skills" className="flex flex-col items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl w-full">
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
					<h2 className="text-2xl uppercase">My Stack</h2>
				</div>

				<div className="flex flex-col">
					{/* Map over tech stack categories */}
					{Object.entries(techStack).map(([category, techs]) => 
						renderCategory(category, techs)
					)}
				</div>
			</div>
		</section>
	);
}
