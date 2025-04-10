import Link from "next/link";
import { Suspense } from "react";
import ProjectsLoading from "./loading";

export default function ProjectsPage() {
  return (
    <div className="content-container py-20">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <Suspense fallback={<ProjectsLoading />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project cards will go here */}
          <div className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Project 1</h2>
            <p className="text-white/70 mb-4">Description of project 1</p>
            <Link href="/projects/project-1" className="text-accent hover:underline">
              View Project
            </Link>
          </div>
          <div className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Project 2</h2>
            <p className="text-white/70 mb-4">Description of project 2</p>
            <Link href="/projects/project-2" className="text-accent hover:underline">
              View Project
            </Link>
          </div>
          <div className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Project 3</h2>
            <p className="text-white/70 mb-4">Description of project 3</p>
            <Link href="/projects/project-3" className="text-accent hover:underline">
              View Project
            </Link>
          </div>
        </div>
      </Suspense>
    </div>
  );
} 