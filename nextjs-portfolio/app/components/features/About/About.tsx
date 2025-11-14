"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { Content, Header } from "./components";

export function About() {
	const sectionRef = useRef<HTMLDivElement>(null);

	// Use useScroll to get scroll progress for this section
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	return (
		<div id="about" className="flex items-center justify-center py-20" ref={sectionRef}>
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl">
				<div className="relative">
					<Header scrollYProgress={scrollYProgress} />
					<Content scrollYProgress={scrollYProgress} />
				</div>
			</div>
		</div>
	);
}
