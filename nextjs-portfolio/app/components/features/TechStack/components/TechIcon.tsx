import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface TechIconProps {
	tech: {
		iconUrl?: string;
		icon?: SanityImageSource;
		name: string;
	};
	urlFor: (source: SanityImageSource) => string | null | undefined;
}

export function TechIcon({ tech, urlFor }: TechIconProps) {
	// Calculate the source URL with fallback
	// Force type as string to satisfy TypeScript
	const sourceUrl: string = tech.iconUrl
		? tech.iconUrl.startsWith("http")
			? tech.iconUrl
			: tech.iconUrl.includes(".svg")
				? tech.iconUrl.startsWith("/icons/")
					? tech.iconUrl
					: `/icons/${tech.iconUrl.replace("icons/", "")}`
				: `/icons/${tech.iconUrl.replace("icons/", "")}.svg`
		: tech.icon && urlFor(tech.icon)
			? (urlFor(tech.icon) ?? "/icons/default-tech-icon.svg")
			: "/icons/default-tech-icon.svg"; // Fallback icon

	return (
		<img
			src={sourceUrl}
			alt={`${tech.name} logo`}
			className="w-16 h-16 object-contain shrink-0"
		/>
	);
}
