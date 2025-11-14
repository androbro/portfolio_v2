import { client } from "@/app/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { MotionValue } from "motion/react";
import { motion } from "motion/react";
import { TechIcon } from "./TechIcon";
type Tech = {
	name: string;
	icon?: SanityImageSource;
	iconUrl?: string;
};

interface CategoryItemProps {
	category: string;
	techs: Tech[];
	categoryIndex: number;
	scrollYProgress: MotionValue<number>;
}

export function CategoryItem({ category, techs }: CategoryItemProps) {
	const { projectId = "", dataset = "" } = client.config();
	const urlFor = (source: SanityImageSource): string | null | undefined => {
		if (!source) return null;
		return imageUrlBuilder({ projectId, dataset }).image(source).url();
	};

	return (
		<div className="mb-20">
			<div className="flex flex-col md:flex-row">
				{/* Category heading */}
				<div className="md:w-1/3 mb-8 md:mb-0">
					<h3 className="text-5xl font-bold text-gray-400 uppercase sticky">{category}</h3>
				</div>

				{/* Technologies grid */}
				<div className="md:w-2/3">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{techs.map((tech) => {
							return (
								<motion.div
									key={`${category}-${tech.name}`}
									className="flex flex-row items-center gap-4 "
									whileHover={{ scale: 1.1 }}
								>
									<TechIcon tech={tech} urlFor={urlFor} />
									<span className="text-lg">{tech.name}</span>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
