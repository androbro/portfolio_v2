"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionTitle } from "../common/SectionTitle";

// Type definition for experience data
export type ExperienceItem = {
	company: string;
	role: string;
	period: string;
	description: string;
};

interface ExperienceClientProps {
	experiences: ExperienceItem[];
}

// Format date from "YYYY-MM-DD" to "Month YYYY"
function formatPeriod(period: string): string {
	// Check if the period string follows the expected format
	const dateRangePattern = /(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})/;
	const match = period.match(dateRangePattern);

	if (!match) return period; // Return original if not matching expected format

	const [_, startDate, endDate] = match;

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		return `${month} ${year}`;
	};

	return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export function ExperienceClient({ experiences }: ExperienceClientProps) {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Create scroll-linked animations
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);
	const titleY = useTransform(scrollYProgress, [0, 0.1, 1], [50, 0, 0]);

	return (
		<div id="experience" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
					<SectionTitle title="Work Experience" />
					<div className="space-y-12">
						{experiences.map((exp, index) => {
							// Create staggered animations for each experience item
							const itemOpacity = useTransform(
								scrollYProgress,
								[0.1 + index * 0.05, 0.2 + index * 0.05, 1],
								[0, 1, 1],
							);
							const itemY = useTransform(
								scrollYProgress,
								[0.1 + index * 0.05, 0.2 + index * 0.05, 1],
								[50, 0, 0],
							);

							return (
								<motion.div
									key={exp.company}
									className="group border-b border-white/10 pb-12 last:border-0"
									style={{
										opacity: itemOpacity,
										y: itemY,
									}}
									whileHover={{ scale: 1.03 }}
									transition={{ duration: 0.2 }}
								>
									<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
										<h3 className="text-4xl md:text-5xl font-light group-hover:text-accent transition-colors">
											{exp.role}
										</h3>
										<span className="text-white/60">
											{formatPeriod(exp.period)}
										</span>
									</div>
									<span className="text-xl text-white/80 mb-4 block">
										{exp.company}
									</span>
									<p className="text-white/70 max-w-3xl font-light">
										{exp.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
