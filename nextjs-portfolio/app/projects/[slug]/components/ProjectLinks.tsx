interface ProjectLinksProps {
	url?: string;
	repositoryUrl?: string;
}

export function ProjectLinks({ url, repositoryUrl }: ProjectLinksProps) {
	if (!url && !repositoryUrl) return null;

	return (
		<div className="flex gap-4 mt-12">
			{url && (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="px-4 py-2 bg-accent text-black rounded-md hover:bg-accent/90 transition-colors"
				>
					View Project
				</a>
			)}
			{repositoryUrl && (
				<a
					href={repositoryUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors"
				>
					Source Code
				</a>
			)}
		</div>
	);
}
