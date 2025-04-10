"use client";

import type Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { initSmoothScroll } from "../utils/smoothScroll";

export const useSmoothScroll = () => {
	const [lenis, setLenis] = useState<Lenis | null>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const lenisInstance = initSmoothScroll();
		setLenis(lenisInstance);

		return () => {
			lenisInstance.destroy();
		};
	}, []);

	// Reset scroll position on route change
	useEffect(() => {
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		}
	}, [pathname, searchParams, lenis]);

	return lenis;
};
