import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "./components/layout/Navbar";
import { PostHogProvider } from "./components/PostHogProvider";
import { BackgroundStars } from "./components/ui/BackgroundStars";
import { Cursor } from "./components/ui/Cursor";
import { CursorContextProvider } from "./components/ui/Cursor/CursorContext";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { RetroOverlay } from "./components/ui/RetroOverlay";
import { SmoothScroller } from "./components/ui/SmoothScroller";
import { ThemeProvider } from "./components/ui/ThemeContext";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import "./globals.css";
import RootLoading from "./loading";

const roboto = Roboto({
	weight: ["100", "300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Koen De Vulder | Frontend Developer",
	description:
		"Frontend Developer specializing in building high-performance, scalable web applications",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>
				<PostHogProvider>
					<ThemeProvider>
						<div className="modern-only">
							<BackgroundStars />
							<CursorContextProvider>
								<Cursor />
							</CursorContextProvider>
						</div>
						<SmoothScroller>
							<Navbar />
							<Suspense fallback={<RootLoading />}>{children}</Suspense>
						</SmoothScroller>
						<ThemeToggle />
						<RetroOverlay />
						<LoadingScreen />
					</ThemeProvider>
				</PostHogProvider>
			</body>
		</html>
	);
}
