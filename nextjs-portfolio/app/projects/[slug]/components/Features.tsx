import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion } from "motion/react";

export function Features({ features }: { features: ProjectItem["features"] }) {
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
