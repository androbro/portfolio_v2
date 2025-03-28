"use client";

import { motion } from "motion/react";

export function Contact() {
	return (
		<section id="contact" className="flex items-center justify-center py-20">
			<div className="content-container">
				<div className="flex items-center gap-4 mb-16">
					<span className="text-accent text-5xl">*</span>
					<motion.h2
						className="text-2xl uppercase"
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: false }}
					>
						Get In Touch
					</motion.h2>
				</div>

				<motion.div
					className="mb-12"
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: false }}
				>
					<h3 className="text-4xl md:text-5xl font-light mb-4">
						Have a project in mind?<br />Let's work together.
					</h3>
					<p className="text-white/60 max-w-2xl font-light">
						I'm currently available for freelance work. If you have a project that you want to get started, think you need my help with something or just fancy saying hey, then get in touch.
					</p>
				</motion.div>

				<motion.a
					href="mailto:contact@example.com"
					className="inline-block bg-accent text-black px-8 py-3 font-light"
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: false }}
				>
					contact@example.com
				</motion.a>
			</div>
		</section>
	);
}
