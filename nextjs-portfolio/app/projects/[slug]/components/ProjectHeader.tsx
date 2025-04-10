import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion } from "motion/react";
import Image from "next/image";

export function ProjectHeader({ project }: { project: ProjectItem }) {
	return (
		<header className="mb-6">
			{/* title */}
			<motion.h1
				className="text-4xl md:text-5xl font-light mb-4"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				{project.title}
			</motion.h1>

			{/* duration */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="flex flex-wrap items-center gap-4 text-white/60 mb-6"
			>
				<span>{project.year}</span>
				{project.duration && (
					<span className="text-white/60">Duration: {project.duration}</span>
				)}
			</motion.div>

			{/* image */}
			{project.image && (
				<motion.div
					className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.8 }}
				>
					<Image
						src={project.image}
						alt={`${project.title} project`}
						fill
						className="object-cover"
						priority
					/>
				</motion.div>
			)}

			{/* tags */}
			{project.tags && project.tags.length > 0 && (
				<motion.div
					className="flex flex-wrap gap-2"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 1.1 }}
				>
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 text-xs bg-white/10 rounded-md"
						>
							{tag}
						</span>
					))}
				</motion.div>
			)}
		</header>
	);
}
