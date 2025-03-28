"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<header className="fixed w-full top-0 z-50 bg-transparent">
			<div className="container mx-auto px-4 py-4 flex justify-end items-center">
				{/* Hamburger Menu Button */}
				<button
					type="button"
					className="text-white z-50"
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

			{/* Full-screen Menu */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex items-center justify-center">
					<nav className="w-full max-w-md mx-auto">
						<div className="flex flex-col space-y-8 text-center">
							<Link
								href="/#hero"
								className="text-3xl text-white hover:text-accent transition-colors"
								onClick={() => setMobileMenuOpen(false)}
							>
								Home
							</Link>
							<Link
								href="/#about"
								className="text-3xl text-white hover:text-accent transition-colors"
								onClick={() => setMobileMenuOpen(false)}
							>
								About Me
							</Link>
							<Link
								href="/#tech-stack"
								className="text-3xl text-white hover:text-accent transition-colors"
								onClick={() => setMobileMenuOpen(false)}
							>
								Tech Stack
							</Link>
							<Link
								href="/#experience"
								className="text-3xl text-white hover:text-accent transition-colors"
								onClick={() => setMobileMenuOpen(false)}
							>
								Experience
							</Link>
							<Link
								href="/#projects"
								className="text-3xl text-white hover:text-accent transition-colors"
								onClick={() => setMobileMenuOpen(false)}
							>
								Projects
							</Link>
							<Link
								href="/#contact"
								className="text-3xl text-white hover:text-accent transition-colors"
								onClick={() => setMobileMenuOpen(false)}
							>
								Contact
							</Link>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
