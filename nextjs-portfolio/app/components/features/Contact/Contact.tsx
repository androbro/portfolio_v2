"use client";

import { motion } from "motion/react";
import { SectionTitle } from "../common/SectionTitle";
export function Contact() {
	return (
		<section id="contact" className="flex items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<SectionTitle title="Get In Touch" />
				<motion.div
					className="mb-12"
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: false }}
				>
					<h3 className="text-4xl md:text-5xl font-light mb-4">
						Interested in working together?
						<br />
						Let's connect.
					</h3>
					<p className="text-white/60 max-w-2xl font-light">
						I'm always open to discussing new projects, creative ideas, or
						opportunities to be part of your vision. Feel free to reach out if
						you're looking for a developer who can bring your ideas to life.
					</p>
				</motion.div>

				<motion.a
					href="mailto:devulderk@gmail.com"
					className="inline-block bg-accent text-black px-8 py-3 font-light"
					initial={{ y: 30, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: false }}
					whileHover={{
						backgroundColor: "rgba(220, 220, 220, 1)",
						scale: 1.05,
					}}
				>
					devulderk@gmail.com
				</motion.a>
			</div>
		</section>
	);
}
