"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "./ThemeContext";

export function RetroOverlay() {
	const { theme } = useTheme();
	const [ads, setAds] = useState({
		visitor: true,
		webring: true,
		ie: true,
	});

	if (theme !== "retro") return null;

	const closeAd = (id: keyof typeof ads) => {
		setAds((prev) => ({ ...prev, [id]: false }));
	};

	const handleVisitorClick = () => {
		alert("YOU HAVE WON A FREE IPAD!!!\n\n(Just kidding, but thanks for clicking!)");
	};

	const handleWebringClick = (action: string) => {
		alert(`Navigating to ${action} site in the ring...\n\nERROR: 404 GEOCITIES NOT FOUND`);
	};

	const handleIEClick = () => {
		alert("Internet Explorer has performed an illegal operation and will be shut down.");
		closeAd("ie");
	};

	return (
		<div className="pointer-events-none absolute inset-0 z-40 overflow-hidden font-serif text-yellow-400 h-full w-full">
			{/* Marquee Top */}
			<div className="absolute top-0 left-0 w-full bg-blue-800 border-b-4 border-white p-2 pointer-events-auto">
				<div className="animate-marquee whitespace-nowrap font-bold text-xl">
					WELCOME TO MY HOMEPAGE *** UNDER CONSTRUCTION *** BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 *** SIGN MY GUESTBOOK ***
				</div>
			</div>

			{/* Floating "Ad" - Visitor Counter */}
			{ads.visitor && (
				<motion.div
					drag
					dragMomentum={false}
					className="pointer-events-auto absolute top-[150px] right-10 cursor-move border-4 border-red-500 bg-yellow-300 p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
				>
					<div className="flex justify-end bg-red-500 mb-1">
						<button
							onClick={() => closeAd("visitor")}
							className="px-1 text-white font-bold hover:bg-red-700 leading-none"
						>
							X
						</button>
					</div>
					<div className="p-2 text-black text-center font-bold">
						<p className="text-lg blink">CONGRATULATIONS!</p>
						<p>You are the 1,000,000th visitor!</p>
						<button
							onClick={handleVisitorClick}
							className="mt-2 bg-blue-600 text-white px-4 py-1 border-2 border-gray-400 active:border-gray-600 cursor-pointer hover:bg-blue-700"
						>
							CLICK HERE
						</button>
					</div>
				</motion.div>
			)}

			{/* Floating "Ad" - Webring */}
			{ads.webring && (
				<motion.div
					drag
					dragMomentum={false}
					className="pointer-events-auto absolute top-[600px] left-10 cursor-move border-4 border-green-600 bg-black text-green-500 p-1 font-mono text-sm shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
				>
					<div className="flex justify-end bg-green-900 mb-1">
						<button
							onClick={() => closeAd("webring")}
							className="px-1 text-green-100 font-bold hover:bg-green-700 leading-none"
						>
							X
						</button>
					</div>
					<div className="p-2">
						<p className="text-center mb-2">*** MEMBER OF ***</p>
						<p className="text-center font-bold text-lg animate-pulse">THE COOL CODERS WEBRING</p>
						<div className="flex justify-between mt-2 text-xs gap-4">
							<span onClick={() => handleWebringClick("PREVIOUS")} className="cursor-pointer hover:text-white hover:underline">[PREV]</span>
							<span onClick={() => handleWebringClick("RANDOM")} className="cursor-pointer hover:text-white hover:underline">[RANDOM]</span>
							<span onClick={() => handleWebringClick("NEXT")} className="cursor-pointer hover:text-white hover:underline">[NEXT]</span>
						</div>
					</div>
				</motion.div>
			)}

			{/* Floating "Ad" - IE Badge */}
			{ads.ie && (
				<motion.div
					drag
					dragMomentum={false}
					className="pointer-events-auto absolute top-[300px] left-1/4 rotate-[-10deg] cursor-move border-2 border-gray-400 bg-gray-200 p-1 text-black text-xs font-sans shadow-lg"
				>
					<div className="flex justify-end bg-blue-800 mb-1">
						<button
							onClick={() => closeAd("ie")}
							className="px-1 text-white font-bold hover:bg-blue-900 leading-none"
						>
							X
						</button>
					</div>
					<div onClick={handleIEClick} className="cursor-pointer p-1">
						<div className="flex items-center gap-2 border border-gray-600 p-1 bg-white">
							<div className="w-8 h-8 bg-blue-500 flex items-center justify-center text-white font-bold rounded-full">e</div>
							<div>
								<p className="font-bold">Microsoft</p>
								<p>Internet Explorer</p>
							</div>
						</div>
						<p className="text-center mt-1 text-[10px] underline text-blue-800">DOWNLOAD NOW!</p>
					</div>
				</motion.div>
			)}

			{/* Marquee Bottom */}
			<div className="absolute bottom-0 left-0 w-full bg-blue-800 border-t-4 border-white p-2 pointer-events-auto">
				<div className="animate-marquee-reverse whitespace-nowrap font-bold text-xl">
					COPYRIGHT 1999 *** ALL RIGHTS RESERVED *** EMAIL ME AT DEVULDERK@GMAIL.COM ***
				</div>
			</div>
		</div>
	);
}
