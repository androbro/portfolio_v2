import type { Metadata } from "next";
import { About } from "./components/features/About";
import { Contact } from "./components/features/Contact";
import { Experience } from "./components/features/Experience";
import { Hero } from "./components/features/Hero";
import { Projects } from "./components/features/Projects";
import { TechStack } from "./components/features/TechStack";
import { Footer } from "./components/layout/Footer";
import { client } from "./sanity/client";
import { type SanityDocument } from "next-sanity";

import Link from "next/link";
export const metadata: Metadata = {
	title: "Koen De Vulder | Frontend Developer",
	description:
		"Frontend Developer specializing in building high-performance, scalable web applications"
};

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
	const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

	return (
		<main className="min-h-screen">
			<div className="container mx-auto min-h-screen max-w-3xl p-8">
				<h1 className="text-4xl font-bold mb-8">Posts</h1>
				<ul className="flex flex-col gap-y-4">
					{posts.map((post) => (
						<li className="hover:underline" key={post._id}>
							<Link href={`/${post.slug.current}`}>
								<h2 className="text-xl font-semibold">{post.title}</h2>
								<p>{new Date(post.publishedAt).toLocaleDateString()}</p>
							</Link>
						</li>
					))}
				</ul>
			</div>

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
