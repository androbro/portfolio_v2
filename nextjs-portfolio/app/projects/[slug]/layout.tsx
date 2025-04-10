import type { ReactNode } from "react";
import { Suspense } from "react";
import Loading from "./loading";

interface ProjectLayoutProps {
	children: ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
	return (
		<div className="content-container py-20">
			<Suspense fallback={<Loading />}>{children}</Suspense>
		</div>
	);
}
