"use client";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../../../sanity/client";

type Tech = {
	name: string;
	icon?: SanityImageSource;
	iconUrl?: string;
};

type TechStackData = Record<string, Tech[]>;

const { projectId = "", dataset = "" } = client.config();

const urlFor = (source: SanityImageSource) =>
	source ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

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
										<img
											src={
												tech.iconUrl
													? tech.iconUrl.startsWith("http")
														? tech.iconUrl
														: tech.iconUrl.includes(".svg")
															? tech.iconUrl.startsWith("/icons/")
																? tech.iconUrl
																: `/icons/${tech.iconUrl.replace("icons/", "")}`
															: `/icons/${tech.iconUrl.replace("icons/", "")}.svg`
													: tech.icon
														? urlFor(tech.icon)?.width(64).height(64).url()
														: undefined
											}
											alt={`${tech.name} logo`}
											className="w-16 h-16 object-contain shrink-0"
										/>
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
