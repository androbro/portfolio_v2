export function Footer() {
	return (
		<footer className="py-8 bg-black text-white">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="mb-4 md:mb-0">
						<p className="text-sm">Copyright © {new Date().getFullYear()} Koen De Vulder</p>
					</div>
					<div className="flex space-x-6">
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-300"
						>
							GitHub
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-300"
						>
							LinkedIn
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-300"
						>
							Twitter
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
