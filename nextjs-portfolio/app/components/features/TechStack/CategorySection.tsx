"use client";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../../../sanity/client";
import { TechIcon } from "./TechIcon";

type Tech = {
	name: string;
	icon?: SanityImageSource;
	iconUrl?: string;
};

type TechStackData = Record<string, Tech[]>;

const { projectId = "", dataset = "" } = client.config();

const urlFor = (source: SanityImageSource): string | null | undefined => {
	if (!source) return null;
	return imageUrlBuilder({ projectId, dataset }).image(source).url();
};

interface CategorySectionProps {
	visibleCategories: [string, Tech[]][];
	techStackData: TechStackData;
}

export function CategorySection({ visibleCategories }: CategorySectionProps) {
	return (
		<div className="w-full">
			{visibleCategories.map(([category, techs], index) => (
				<div key={category} className="mb-20">
					<div className="flex flex-col md:flex-row">
						{/* Category name */}
						<div className="md:w-1/3 mb-8 md:mb-0">
							<h3 className="text-5xl font-bold text-gray-400 uppercase sticky top-20">
								{category}
							</h3>
						</div>

						{/* Tech icons */}
						<div className="md:w-2/3">
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
								{techs.map((tech) => (
									<div
										key={`${category}-${tech.name}`}
										className="flex flex-row items-center gap-4 hover:scale-105 transition-transform"
									>
										<TechIcon tech={tech} urlFor={urlFor} />
										<span className="text-lg">{tech.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
