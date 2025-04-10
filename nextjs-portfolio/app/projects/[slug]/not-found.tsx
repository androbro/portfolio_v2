import Link from "next/link";

export default function ProjectNotFound() {
	return (
		<div className="content-container py-20 flex flex-col items-center justify-center min-h-[60vh]">
			<h1 className="text-4xl font-light mb-4">Project Not Found</h1>
			<p className="text-white/70 mb-8 text-center max-w-md">
				The project you are looking for does not exist or has been removed.
			</p>
			<Link
				href="/#projects"
				className="px-4 py-2 bg-accent text-black rounded-md hover:bg-accent/90 transition-colors"
			>
				Back to Projects
			</Link>
		</div>
	);
}
