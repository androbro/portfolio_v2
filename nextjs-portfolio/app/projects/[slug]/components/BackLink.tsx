import Link from "next/link";

export function BackLink() {
	return (
		<Link
			href="/#projects"
			className="inline-flex items-center text-accent hover:underline mb-8"
		>
			← Back to Projects
		</Link>
	);
}
