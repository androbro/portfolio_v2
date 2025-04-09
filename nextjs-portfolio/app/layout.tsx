import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Navbar } from "./components/layout/Navbar";
import { BackgroundStars } from "./components/ui/BackgroundStars";
import { Cursor } from "./components/ui/Cursor";
import { CursorContextProvider } from "./components/ui/Cursor/CursorContext";
import { SmoothScroller } from "./components/ui/SmoothScroller";
import "./globals.css";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>
				<BackgroundStars />
				<CursorContextProvider>
					<Cursor />
					<SmoothScroller>
						<Navbar />
						{children}
					</SmoothScroller>
				</CursorContextProvider>
			</body>
		</html>
	);
}
