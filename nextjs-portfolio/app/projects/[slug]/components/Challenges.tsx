import { SectionTitle } from "@/app/components/features/common/SectionTitle";
import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion } from "motion/react";

export function Challenges({
	challenges,
}: { challenges: ProjectItem["challenges"] }) {
	if (!challenges || challenges.length === 0) return null;

	return (
		<div className="mt-12">
			<SectionTitle title="Challenges & Solutions" />
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
		</div>
	);
}
