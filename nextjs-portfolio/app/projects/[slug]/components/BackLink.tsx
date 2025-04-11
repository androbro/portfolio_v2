"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BackLink() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		setIsLoading(true);
		router.push("/#projects");
	};

	return (
		<motion.button
			onClick={handleClick}
			disabled={isLoading}
			className="px-3 py-2 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-all flex items-center gap-1 shadow-sm relative overflow-hidden mb-2"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				className="flex items-center gap-1 relative z-10"
				animate={{
					opacity: isLoading ? 0.5 : 1,
				}}
				transition={{ duration: 0.2 }}
			>
				<motion.span className="font-medium">
					{isLoading ? "Loading..." : "← Back to Projects"}
				</motion.span>
			</motion.div>
			{isLoading && (
				<motion.div
					className="absolute bottom-0 left-0 h-[2px] bg-accent"
					initial={{ width: "0%" }}
					animate={{
						width: "100%",
					}}
					transition={{
						duration: 1.5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
			)}
		</motion.button>
	);
}
