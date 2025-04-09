"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<>
			{/* Hamburger Menu Button */}
			<button
				type="button"
				className="fixed top-8 right-8 text-white z-50"
				onClick={toggleMobileMenu}
				aria-label="Toggle menu"
			>
				<motion.div
					animate={mobileMenuOpen ? "open" : "closed"}
					variants={{
						open: { rotate: 180 },
						closed: { rotate: 0 },
					}}
					transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
				>
					{mobileMenuOpen ? (
						<motion.svg
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
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.2 }}
						>
							<motion.line 
								x1="18" 
								y1="6" 
								x2="6" 
								y2="18" 
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								transition={{ duration: 0.5, delay: 0.1 }}
							/>
							<motion.line 
								x1="6" 
								y1="6" 
								x2="18" 
								y2="18" 
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							/>
						</motion.svg>
					) : (
						<motion.svg
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
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.2 }}
						>
							<motion.line 
								x1="3" 
								y1="12" 
								x2="21" 
								y2="12" 
								initial={{ x2: "3" }}
								animate={{ x2: "21" }}
								transition={{ duration: 0.4, delay: 0.1 }}
							/>
							<motion.line 
								x1="3" 
								y1="6" 
								x2="21" 
								y2="6" 
								initial={{ x2: "3" }}
								animate={{ x2: "21" }}
								transition={{ duration: 0.4 }}
							/>
							<motion.line 
								x1="3" 
								y1="18" 
								x2="21" 
								y2="18" 
								initial={{ x2: "3" }}
								animate={{ x2: "21" }}
								transition={{ duration: 0.4, delay: 0.2 }}
							/>
						</motion.svg>
					)}
				</motion.div>
			</button>

			{/* Side Navigation */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.header
						className="fixed right-0 top-0 h-full w-[300px] bg-black/95 backdrop-blur-md z-40 flex flex-col p-8 pt-24"
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 20, stiffness: 100 }}
					>
						{/* Social Links */}
						<div className="flex flex-col gap-4">
							<span className="text-white/60 text-sm uppercase tracking-wider">Social</span>
							<div className="flex flex-col gap-3">
								<Link
									href="https://github.com"
									target="_blank"
									className="text-white hover:text-accent transition-colors"
								>
									Github
								</Link>
								<Link
									href="https://linkedin.com"
									target="_blank"
									className="text-white hover:text-accent transition-colors"
								>
									Linkedin
								</Link>
								<Link
									href="https://facebook.com"
									target="_blank"
									className="text-white hover:text-accent transition-colors"
								>
									Facebook
								</Link>
								<Link href="/old" className="text-white hover:text-accent transition-colors">
									Old Version
								</Link>
							</div>
						</div>

						{/* Menu Links */}
						<div className="flex flex-col gap-4 mt-8">
							<span className="text-white/60 text-sm uppercase tracking-wider">Menu</span>
							<div className="flex flex-col gap-3">
								<Link
									href="/#hero"
									className="text-white hover:text-accent transition-colors flex items-center gap-2"
								>
									<span className="inline-block w-2 h-2 rounded-full nav-dot-yellow" />
									Home
								</Link>
								<Link
									href="/#about"
									className="text-white hover:text-accent transition-colors flex items-center gap-2"
								>
									<span className="inline-block w-2 h-2 rounded-full nav-dot-blue" />
									About Me
								</Link>
								<Link
									href="/#experience"
									className="text-white hover:text-accent transition-colors flex items-center gap-2"
								>
									<span className="inline-block w-2 h-2 rounded-full nav-dot-teal" />
									Experience
								</Link>
								<Link
									href="/#projects"
									className="text-white hover:text-accent transition-colors flex items-center gap-2"
								>
									<span className="inline-block w-2 h-2 rounded-full nav-dot-purple" />
									Projects
								</Link>
							</div>
						</div>

						{/* Contact Info */}
						<div className="flex flex-col gap-4 mt-auto">
							<span className="text-white/60 text-sm uppercase tracking-wider">Get in touch</span>
							<a
								href="mailto:devulderk@gmail.com"
								className="text-white hover:text-accent transition-colors"
							>
								devulderk@gmail.com
							</a>
						</div>
					</motion.header>
				)}
			</AnimatePresence>
		</>
	);
}
