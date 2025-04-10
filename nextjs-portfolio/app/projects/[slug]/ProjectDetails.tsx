"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { PortableText } from "@portabletext/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

// Back link component
function BackLink() {
	return (
		<Link
			href="/#projects"
			className="inline-flex items-center text-accent hover:underline mb-8"
		>
			← Back to Projects
		</Link>
	);
}

// Component for project header
function ProjectHeader({ project }: { project: ProjectItem }) {
	return (
		<header className="mb-12">
			<h1 className="text-4xl md:text-5xl font-light mb-4">{project.title}</h1>
			<div className="flex flex-wrap items-center gap-4 text-white/60 mb-6">
				<span>{project.year}</span>
				{project.duration && (
					<span className="text-white/60">Duration: {project.duration}</span>
				)}
				{project.tags && project.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<span
								key={tag}
								className="px-2 py-1 text-xs bg-white/10 rounded-md"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>

			{project.image && (
				<div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
					<Image
						src={project.image}
						alt={`${project.title} project`}
						fill
						className="object-cover"
						priority
					/>
				</div>
			)}
		</header>
	);
}

// Screenshot Gallery Component
function ScreenshotGallery({
	screenshots,
}: { screenshots: ProjectItem["projectScreenshots"] }) {
	if (!screenshots || screenshots.length === 0) return null;

	return (
		<section className="mt-12">
			<h2 className="text-2xl font-medium mb-6">Project Screenshots</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{screenshots.map((screenshot, index) => (
					<motion.div
						key={`screenshot-${screenshot.url}-${index}`}
						className="relative h-64 rounded-lg overflow-hidden"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						viewport={{ once: true }}
					>
						<Image
							src={screenshot.url}
							alt={screenshot.alt || "Project screenshot"}
							fill
							className="object-cover"
						/>
						{screenshot.caption && (
							<div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-sm">
								{screenshot.caption}
							</div>
						)}
					</motion.div>
				))}
			</div>
		</section>
	);
}

// Features Component
function Features({ features }: { features: ProjectItem["features"] }) {
	if (!features || features.length === 0) return null;

	return (
		<section className="mt-12">
			<h2 className="text-2xl font-medium mb-6">Key Features</h2>
			<ul className="space-y-2 list-disc pl-5">
				{features.map((feature, index) => (
					<motion.li
						key={`feature-${feature.substring(0, 10)}-${index}`}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, delay: index * 0.05 }}
						viewport={{ once: true }}
						className="text-white/80"
					>
						{feature}
					</motion.li>
				))}
			</ul>
		</section>
	);
}

// Challenges Component
function Challenges({ challenges }: { challenges: ProjectItem["challenges"] }) {
	if (!challenges || challenges.length === 0) return null;

	return (
		<section className="mt-12">
			<h2 className="text-2xl font-medium mb-6">Challenges & Solutions</h2>
			<div className="space-y-8">
				{challenges.map((item, index) => (
					<motion.div
						key={`challenge-${item.challenge.substring(0, 10)}-${index}`}
						className="bg-white/5 p-6 rounded-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl font-medium text-accent mb-3">
							{item.challenge}
						</h3>
						<p className="text-white/80">{item.solution}</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}

// Component for project content
function ProjectContent({ project }: { project: ProjectItem }) {
	return (
		<div className="prose prose-invert max-w-none">
			{typeof project.fullDescription === "string" ? (
				<p className="text-lg text-white/80">{project.fullDescription}</p>
			) : (
				<div className="text-lg text-white/80">
					<PortableText value={project.fullDescription} />
				</div>
			)}

			<Features features={project.features} />
			<Challenges challenges={project.challenges} />
			<ScreenshotGallery screenshots={project.projectScreenshots} />

			{/* Project links */}
			{(project.url || project.repositoryUrl) && (
				<div className="flex gap-4 mt-12">
					{project.url && (
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 bg-accent text-black rounded-md hover:bg-accent/90 transition-colors"
						>
							View Project
						</a>
					)}
					{project.repositoryUrl && (
						<a
							href={project.repositoryUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
						>
							Source Code
						</a>
					)}
				</div>
			)}
		</div>
	);
}

export default function ProjectDetails({ project }: { project: ProjectItem }) {
	return (
		<>
			<BackLink />
			<article className="max-w-4xl mx-auto">
				<ProjectHeader project={project} />
				<ProjectContent project={project} />
			</article>
		</>
	);
}
