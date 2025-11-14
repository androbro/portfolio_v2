import { gsap } from "gsap";
import { type RefObject, useEffect } from "react";

interface AnimationRefs {
	headingRef: RefObject<HTMLHeadingElement | null>;
	paragraphRef: RefObject<HTMLParagraphElement | null>;
	statsRefs: RefObject<HTMLDivElement | null>[];
}

/**
 * Custom hook for handling Hero section animations using GSAP
 */
export function useHeroAnimations({ headingRef, paragraphRef, statsRefs }: AnimationRefs) {
	// Initialize and run animations on component mount
	useEffect(() => {
		if (!headingRef.current || !paragraphRef.current || statsRefs.some((ref) => !ref.current)) {
			return; // Don't run animations if refs aren't available
		}

		// GSAP animation for text fade-in
		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		// Animate heading
		tl.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });

		// Animate paragraph with slight delay
		tl.fromTo(
			paragraphRef.current,
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8 },
			"-=0.4",
		);

		// Animate stats with staggered timing - filter out null refs
		const validStatsRefs = statsRefs.map((ref) => ref.current).filter(Boolean);

		tl.fromTo(
			validStatsRefs,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
			"-=0.3",
		);

		// Cleanup function
		return () => {
			tl.kill();
		};
	}, [headingRef, paragraphRef, statsRefs]);
}
