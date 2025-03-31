"use client";

import { AsterixIcon } from "@/app/assets/icons";
import { motion } from "motion/react";

// Tech icons - using placeholders for now
const DemoIcon = ({ className }: { className?: string }) => (
	<div className={`${className} flex items-center justify-center rounded-md`}>
		<span className="text-2xl">��</span>
	</div>
);

export function TechStack() {
	return (
		<section id="skills" className="flex flex-col items-center justify-center py-20">
			<div className="content-container md:w-4xl lg:w-6xl xl:w-7xl w-full">
				<div className="flex items-center gap-4 mb-16">
					<motion.div
						className="text-accent" 
						animate={{
							rotate: 360
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: "linear"
						}}
					>
						<AsterixIcon className="w-8 h-8" />
					</motion.div>
					<h2 className="text-2xl uppercase">My Stack</h2>
				</div>

				<div className="flex flex-col space-y-16">
					{/* FRONTEND */}
					<div>
						<h3 className="text-5xl font-bold text-gray-400 uppercase mb-8">Frontend</h3>
						<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-yellow-500 text-black w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">JS</span>
								</div>
								<span>Javascript</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-blue-500 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">TS</span>
								</div>
								<span>Typescript</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-blue-400 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">⚛️</span>
								</div>
								<span>React</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-black text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">N</span>
								</div>
								<span>Next.JS</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-purple-500 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">R</span>
								</div>
								<span>Redux</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-blue-300 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">T</span>
								</div>
								<span>Tailwind CSS</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-green-500 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">G</span>
								</div>
								<span>GSAP</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-purple-600 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">FM</span>
								</div>
								<span>Frammer Motion</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-pink-500 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">S</span>
								</div>
								<span>SASS</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-purple-800 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">B</span>
								</div>
								<span>Bootstrap</span>
							</motion.div>
						</div>
					</div>
					
					{/* BACKEND */}
					<div>
						<h3 className="text-5xl font-bold text-gray-400 uppercase mb-8">Backend</h3>
						<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-green-600 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">N</span>
								</div>
								<span>Node.JS</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-red-500 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">N</span>
								</div>
								<span>Nest.JS</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-gray-200 text-black w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">EX</span>
								</div>
								<span>Express.Js</span>
							</motion.div>
						</div>
					</div>
					
					{/* DATABASE */}
					<div>
						<h3 className="text-5xl font-bold text-gray-400 uppercase mb-8">Database</h3>
						<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-blue-600 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">M</span>
								</div>
								<span>MySQL</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-blue-400 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">P</span>
								</div>
								<span>PostgreSQL</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-green-500 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">M</span>
								</div>
								<span>MongoDB</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-gray-700 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">P</span>
								</div>
								<span>Prisma</span>
							</motion.div>
						</div>
					</div>
					
					{/* TOOLS */}
					<div>
						<h3 className="text-5xl font-bold text-gray-400 uppercase mb-8">Tools</h3>
						<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-red-500 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">G</span>
								</div>
								<span>Git</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-blue-600 text-white w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">D</span>
								</div>
								<span>Docker</span>
							</motion.div>
							
							<motion.div 
								className="flex flex-col items-center"
								whileHover={{ scale: 1.05 }}
							>
								<div className="bg-gray-600 text-orange-300 w-16 h-16 rounded-md flex items-center justify-center mb-2">
									<span className="text-3xl">A</span>
								</div>
								<span>AWS</span>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
