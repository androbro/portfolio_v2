"use client";

import { techStackData } from "@/app/assets/content/TechStackData";
import { AsterixIcon } from "@/app/assets/icons";
import { motion, useScroll } from "motion/react";
import { useRef, useState } from "react";

export function TechStack() {
	const [showAll, setShowAll] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollY } = useScroll();

	const handleShowToggle = () => {
		setShowAll(!showAll);
		if (showAll && sectionRef.current) {
			// Use smooth scroll with motion
			window.scrollTo({
				top: sectionRef.current.offsetTop - 100, // Offset to account for any fixed headers
				behavior: "smooth",
			});
		}
	};

	// Function to render a category section
	const renderCategory = (
		category: string,
		techs: {
			name: string;
			initials: string;
			color: string;
			textColor: string;
		}[],
	) => {
		return (
			<div key={category} className="mb-20">
				<div className="flex flex-col md:flex-row">
					{/* Text on the left */}
					<div className="md:w-1/3 mb-8 md:mb-0">
						<h3 className="text-5xl font-bold text-gray-400 uppercase sticky top-20">{category}</h3>
					</div>

					{/* Icons on the right */}
					<div className="md:w-2/3">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{techs.map((tech, index) => (
								<motion.div
									key={`${category}-${tech.name}`}
									className="flex flex-row items-center gap-4"
									initial={{
										opacity: 0,
										x: 50,
									}}
									whileInView={{
										opacity: 1,
										x: 0,
										transition: {
											duration: 0.5,
											delay: index * 0.1,
										},
									}}
									viewport={{
										once: true,
									}}
									whileHover={{
										scale: 1.05,
									}}
								>
									<div
										className={`${tech.color} ${tech.textColor} w-16 h-16 rounded-md flex items-center justify-center shrink-0`}
									>
										<span className="text-3xl">{tech.initials}</span>
									</div>
									<span className="text-lg">{tech.name}</span>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	};

	// Get visible categories based on showAll state
	const getVisibleCategories = () => {
		const defaultCategories = ["frontend", "backend", "database"];
		const entries = Object.entries(techStackData);

		if (showAll) {
			return entries;
		}

		return entries.filter(([category]) => defaultCategories.includes(category));
	};

	return (
		<section
			ref={sectionRef}
			id="skills"
			className="flex flex-col items-center justify-center py-20"
		>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl w-full">
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
					<h2 className="text-2xl uppercase">My Stack</h2>
				</div>

				<div className="flex flex-col">
					{/* Map over visible tech stack categories */}
					{getVisibleCategories().map(([category, techs]) => renderCategory(category, techs))}

					{/* Show More/Less button */}
					<motion.button
						onClick={handleShowToggle}
						className="self-center mt-8 px-6 py-2 bg-accent text-black font-light hover:bg-white/90 transition-colors"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{showAll ? "Show Less" : "Show More"}
					</motion.button>
				</div>
			</div>
		</section>
	);
}
