import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion } from "motion/react";
import Image from "next/image";

export function ScreenshotGallery({
	screenshots,
}: {
	screenshots: ProjectItem["projectScreenshots"];
}) {
	if (!screenshots || screenshots.length === 0) return null;

	return (
		<div className="mt-12">
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
		</div>
	);
}
