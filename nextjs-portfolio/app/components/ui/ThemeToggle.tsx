"use client";

import { useTheme } from "./ThemeContext";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="fixed bottom-8 left-8 z-50 px-4 py-2 bg-accent text-background font-bold uppercase tracking-wider hover:scale-105 transition-transform border-2 border-transparent hover:border-foreground"
			aria-label="Toggle Theme"
		>
			{theme === "modern" ? "Retro Mode" : "Modern Mode"}
		</button>
	);
}
