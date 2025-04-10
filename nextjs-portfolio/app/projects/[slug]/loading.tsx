export default function Loading() {
	return (
		<main className="min-h-screen">
			{/* Back Link Section */}
			<section className="flex items-center justify-center py-10">
				<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
					<div className="inline-flex items-center text-accent/70">
						← Back to Projects
					</div>
				</div>
			</section>

			{/* Project Header Section */}
			<section
				id="project-header"
				className="flex items-center justify-center py-20"
			>
				<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
					<header className="mb-12">
						<div className="h-12 w-3/4 bg-white/10 rounded-md mb-4 animate-pulse" />
						<div className="flex items-center gap-4 mb-6">
							<div className="h-6 w-16 bg-white/10 rounded-md animate-pulse" />
							<div className="flex flex-wrap gap-2">
								<div className="h-6 w-16 bg-white/10 rounded-md animate-pulse" />
								<div className="h-6 w-20 bg-white/10 rounded-md animate-pulse" />
								<div className="h-6 w-14 bg-white/10 rounded-md animate-pulse" />
							</div>
						</div>

						<div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-white/10 animate-pulse" />
					</header>
				</div>
			</section>

			{/* Project Content Section */}
			<section
				id="project-content"
				className="flex items-center justify-center py-20"
			>
				<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
					<div className="prose prose-invert max-w-none">
						<div className="h-6 w-full bg-white/10 rounded-md mb-4 animate-pulse" />
						<div className="h-6 w-5/6 bg-white/10 rounded-md mb-4 animate-pulse" />
						<div className="h-6 w-4/6 bg-white/10 rounded-md mb-4 animate-pulse" />
						<div className="h-6 w-3/4 bg-white/10 rounded-md mb-4 animate-pulse" />

						<div className="flex gap-4 mt-8">
							<div className="h-10 w-32 bg-white/10 rounded-md animate-pulse" />
							<div className="h-10 w-32 bg-white/10 rounded-md animate-pulse" />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
