"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { useCursorContext } from "./CursorContext";
import "./cursor.css";

export function Cursor() {
	const { initialCursorVariant, animateCursorVariant, animateCursor } =
		useCursorContext();
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	// Different cursor animations
	const variants = {
		// Default cursor state when entering the page
		cursorEnter: {
			border: "1px solid var(--accent)",
			boxShadow: "0 0 1px 0px var(--accent) inset, 0 0 1px 0px var(--accent)",
			scale: 1,
			borderRadius: "50%",
			backgroundColor: "transparent",
			transition: {
				duration: 0.2,
			},
		},
		// Cursor state when leaving the page
		cursorLeave: {
			scale: 0,
			border: 0,
			backgroundColor: "transparent",
			transition: {
				duration: 0.2,
			},
		},
		// Cursor state when hovering over buttons
		buttonHover: {
			scale: 1.5,
			backgroundColor: "var(--accent)",
			borderRadius: "50%",
			transition: {
				type: "spring",
				mass: 0.5,
				stiffness: 200,
				damping: 10,
			},
		},
		// Cursor state when hovering over text
		textHover: {
			scale: 2,
			backgroundColor: "rgba(255, 255, 255, 0.2)",
			border: "1px solid var(--accent)",
			transition: {
				type: "spring",
				mass: 0.5,
				stiffness: 200,
				damping: 10,
			},
		},
	};

	useEffect(() => {
		// Track mouse movement
		const mouseMoveHandler = (e: MouseEvent) => {
			cursorX.set(e.clientX - 12);
			cursorY.set(e.clientY - 12);
		};

		// Handle cursor entering the page
		const mouseEnterHandler = () => {
			animateCursor("cursorEnter");
		};

		// Handle cursor leaving the page
		const mouseLeaveHandler = () => {
			animateCursor("cursorLeave");
		};

		// Set up button hover effects
		const setupButtonHoverEffects = () => {
			const buttons = document.querySelectorAll(
				'a, button, [role="button"], input[type="submit"]',
			);

			for (const button of buttons) {
				button.addEventListener("mouseenter", () => {
					animateCursor("buttonHover");
				});

				button.addEventListener("mouseleave", () => {
					animateCursor("cursorEnter");
				});
			}
		};

		// Set up text hover effects
		const setupTextHoverEffects = () => {
			const textElements = document.querySelectorAll(
				"p, h1, h2, h3, h4, h5, h6, span",
			);

			for (const element of textElements) {
				element.addEventListener("mouseenter", () => {
					animateCursor("textHover");
				});

				element.addEventListener("mouseleave", () => {
					animateCursor("cursorEnter");
				});
			}
		};

		// Add event listeners
		window.addEventListener("mousemove", mouseMoveHandler);
		document.body.addEventListener("mouseenter", mouseEnterHandler);
		document.body.addEventListener("mouseleave", mouseLeaveHandler);

		// Setup hover effects
		setupButtonHoverEffects();
		setupTextHoverEffects();

		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener("mousemove", mouseMoveHandler);
			document.body.removeEventListener("mouseenter", mouseEnterHandler);
			document.body.removeEventListener("mouseleave", mouseLeaveHandler);
		};
	}, [animateCursor, cursorX, cursorY]);

	return (
		<motion.div
			className="cursor"
			variants={variants}
			initial={initialCursorVariant}
			animate={animateCursorVariant}
			style={{
				translateX: cursorX,
				translateY: cursorY,
			}}
		/>
	);
}
