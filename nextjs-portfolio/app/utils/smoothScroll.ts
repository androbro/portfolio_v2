import Lenis from "lenis";

export const initSmoothScroll = () => {
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
		wheelMultiplier: 1,
		touchMultiplier: 2,
		smoothWheel: true,
		gestureOrientation: "vertical",
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	// Handle Next.js navigation events
	if (typeof window !== "undefined") {
		// Reset scroll on route change start
		window.addEventListener("beforeunload", () => {
			lenis.scrollTo(0, { immediate: true });
		});

		// Reset scroll on route change complete
		window.addEventListener("load", () => {
			lenis.scrollTo(0, { immediate: true });
		});
	}

	return lenis;
};
