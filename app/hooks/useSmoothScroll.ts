"use client";

import type Lenis from "lenis";
import { useEffect, useState } from "react";
import { initSmoothScroll } from "../utils/smoothScroll";

export const useSmoothScroll = () => {
	const [lenis, setLenis] = useState<Lenis | null>(null);

	useEffect(() => {
		const lenisInstance = initSmoothScroll();
		setLenis(lenisInstance);

		return () => {
			lenisInstance.destroy();
		};
	}, []);

	return lenis;
};
