"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

// Type definition for portable text blocks
type PortableTextBlock = {
	_type: string;
	_key?: string;
	style?: string;
	children?: Array<{
		_type: string;
		text: string;
		marks?: string[];
	}>;
};

// Type definition for experience data
export type ExperienceItem = {
	company: string;
	role: string;
	period: string;
	description: string | PortableTextBlock[];
};

interface ExperienceClientProps {
	experiences: ExperienceItem[];
}

// Custom components for PortableText in Experience section
const experiencePortableTextComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className="text-white/70 mb-3 font-light leading-relaxed">{children}</p>
		),
		h2: ({ children }) => (
			<h4 className="text-xl text-white mt-4 mb-2 font-light">{children}</h4>
		),
		h3: ({ children }) => (
			<h5 className="text-lg text-white mt-3 mb-2 font-light">{children}</h5>
		),
		h4: ({ children }) => (
			<h6 className="text-base text-white mt-2 mb-1 font-light">{children}</h6>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="list-disc list-inside text-white/70 mb-3 space-y-1 ml-4">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="list-decimal list-inside text-white/70 mb-3 space-y-1 ml-4">
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => <li className="ml-2">{children}</li>,
		number: ({ children }) => <li className="ml-2">{children}</li>,
	},
	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold text-white">{children}</strong>
		),
		em: ({ children }) => <em className="italic">{children}</em>,
		code: ({ children }) => (
			<code className="bg-white/10 px-1.5 py-0.5 rounded text-accent font-mono text-sm">
				{children}
			</code>
		),
	},
};

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

	return (
		<div id="experience" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
					<SectionTitle title="Work Experience" />
					<div className="space-y-12">
						{experiences.map((exp, index) => {
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
									<div className="text-white/70 max-w-3xl font-light">
										{typeof exp.description === "string" ? (
											<p className="text-white/70 font-light">{exp.description}</p>
										) : (
											<PortableText
												value={exp.description}
												components={experiencePortableTextComponents}
											/>
										)}
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
