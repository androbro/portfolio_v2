import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { motion } from "motion/react";
import { Challenges } from "./Challenges";
import { ScreenshotGallery } from "./ScreenshotGallery";

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className="text-lg text-white/80 mb-4 leading-relaxed">{children}</p>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-light text-white mt-8 mb-4">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl font-light text-white mt-6 mb-3">{children}</h3>
		),
		h4: ({ children }) => (
			<h4 className="text-xl font-light text-white mt-4 mb-2">{children}</h4>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="list-disc list-inside text-lg text-white/80 mb-4 space-y-2">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="list-decimal list-inside text-lg text-white/80 mb-4 space-y-2">
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => <li className="ml-4">{children}</li>,
		number: ({ children }) => <li className="ml-4">{children}</li>,
	},
	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold text-white">{children}</strong>
		),
		em: ({ children }) => <em className="italic">{children}</em>,
		code: ({ children }) => (
			<code className="bg-white/10 px-2 py-1 rounded text-accent font-mono text-sm">
				{children}
			</code>
		),
	},
};

export function ProjectContent({ project }: { project: ProjectItem }) {
	return (
		<motion.div
			className="max-w-none"
			initial={{ opacity: 0, y: 150 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1, delay: 1.1 }}
		>
			{typeof project.fullDescription === "string" ? (
				<p className="text-lg text-white/80">{project.fullDescription}</p>
			) : (
				<div className="text-lg text-white/80">
					<PortableText
						value={project.fullDescription}
						components={portableTextComponents}
					/>
				</div>
			)}
			<Challenges challenges={project.challenges} />
			<ScreenshotGallery screenshots={project.projectScreenshots} />
		</motion.div>
	);
}
