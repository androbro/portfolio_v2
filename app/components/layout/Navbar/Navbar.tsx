"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="text-xl font-bold">Koen De Vulder</div>

				{/* Desktop Menu */}
				<nav className="hidden md:flex space-x-8">
					<Link href="/#home" className="hover:text-gray-500 transition-colors">
						Home
					</Link>
					<Link href="/#about" className="hover:text-gray-500 transition-colors">
						About Me
					</Link>
					<Link href="/#experience" className="hover:text-gray-500 transition-colors">
						Experience
					</Link>
					<Link href="/#projects" className="hover:text-gray-500 transition-colors">
						Projects
					</Link>
				</nav>

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="md:hidden text-black"
					onClick={toggleMobileMenu}
					aria-label="Toggle menu"
				>
					{mobileMenuOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<line x1="3" y1="12" x2="21" y2="12" />
							<line x1="3" y1="6" x2="21" y2="6" />
							<line x1="3" y1="18" x2="21" y2="18" />
						</svg>
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<nav className="md:hidden bg-white py-4 px-4">
					<div className="flex flex-col space-y-4">
						<Link
							href="/#home"
							className="block py-2 hover:text-gray-500 transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/#about"
							className="block py-2 hover:text-gray-500 transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							About Me
						</Link>
						<Link
							href="/#experience"
							className="block py-2 hover:text-gray-500 transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Experience
						</Link>
						<Link
							href="/#projects"
							className="block py-2 hover:text-gray-500 transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Projects
						</Link>
					</div>
				</nav>
			)}
		</header>
	);
}
