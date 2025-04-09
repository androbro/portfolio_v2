import Lenis from "lenis";

export const initSmoothScroll = () => {
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
		wheelMultiplier: 1,
		touchMultiplier: 2,
		smoothWheel: true,
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	return lenis;
};
