import { redirect } from "next/navigation";

export default function ProjectsPage() {
	// Redirect to the home page with the projects section in focus
	redirect("/#projects");
}
