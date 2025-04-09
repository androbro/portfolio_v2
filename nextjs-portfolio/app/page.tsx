import type { Metadata } from "next";
import { About } from "./components/features/About";
import { Contact } from "./components/features/Contact";
import { Experience } from "./components/features/Experience";
import { Hero } from "./components/features/Hero";
import { Projects } from "./components/features/Projects";
import { TechStack } from "./components/features/TechStack";
import { Footer } from "./components/layout/Footer";

export const metadata: Metadata = {
	title: "Koen De Vulder | Frontend Developer",
	description:
		"Frontend Developer specializing in building high-performance, scalable web applications",
};

export default async function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<Hero />

			{/* About Section */}
			<About />

			{/* My Stack Section */}
			<TechStack />

			{/* Experience Section */}
			<Experience />

			{/* Projects Section */}
			<Projects />

			{/* Contact Section */}
			<Contact />

			{/* Footer */}
			<Footer />
		</main>
	);
}
