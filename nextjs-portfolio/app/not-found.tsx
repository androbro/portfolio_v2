import Link from "next/link";

export default function NotFound() {
	return (
		<div className="content-container flex flex-col items-center justify-center min-h-[70vh] text-center">
			<h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
			<p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
			<Link
				href="/"
				className="px-4 py-2 bg-accent text-black rounded-md hover:bg-accent/90 transition-colors"
			>
				Return Home
			</Link>
		</div>
	);
}
