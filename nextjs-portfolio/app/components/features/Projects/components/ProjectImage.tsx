"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { motion } from "motion/react";
import Image from "next/image";

interface ProjectImageProps {
  project: ProjectItem;
  isExpanded: boolean;
  smoothTransition: {
    type: string;
    duration: number;
    ease: string;
  };
}

export function ProjectImage({ project, isExpanded, smoothTransition }: ProjectImageProps) {
  return (
    <motion.div 
      className={`relative ${isExpanded ? 'md:w-1/2' : 'md:w-1/3'} h-48 md:h-auto m-2`}
      animate={{
        width: isExpanded ? '50%' : '33.333%',
      }}
      transition={smoothTransition}
      layout="preserve-aspect"
    >
      {project.cardImage ? (
        <motion.div
          className="relative w-full h-full"
          layout="preserve-aspect"
          transition={smoothTransition}
        >
          <Image
            src={project.cardImage}
            alt={`${project.title} project thumbnail`}
            fill
            className="object-contain"
            title={`${project.title} project thumbnail`}
          />
        </motion.div>
      ) : (
        <motion.div 
          className="w-full h-full bg-white/5 flex items-center justify-center"
          layout="preserve-aspect"
          transition={smoothTransition}
        >
          <motion.span 
            className="text-white/40"
            layout="position"
            transition={smoothTransition}
          >
            No image
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
} 