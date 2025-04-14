export function Footer() {
	return (
		<footer className="py-8  text-white">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="mb-4 md:mb-0">
						<p className="text-sm">
							Copyright © {new Date().getFullYear()} Koen De Vulder
						</p>
					</div>
					<div className="flex space-x-6">
						<a
							href="https://github.com/androbro"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-300"
						>
							GitHub
						</a>
						<a
							href="https://www.linkedin.com/in/koendevulder/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-300"
						>
							LinkedIn
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
