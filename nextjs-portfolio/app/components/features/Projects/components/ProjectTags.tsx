"use client";

import { motion } from "motion/react";

interface ProjectTagsProps {
  tags: string[];
  isExpanded: boolean;
  smoothTransition: {
    type: string;
    duration: number;
    ease: string;
  };
}

export function ProjectTags({ tags, isExpanded, smoothTransition }: ProjectTagsProps) {
  if (!tags || tags.length === 0) return null;
  
  return (
    <motion.div 
      className="flex flex-wrap gap-2 mb-4"
      layout="position"
      transition={smoothTransition}
    >
      {tags.slice(0, isExpanded ? tags.length : 3).map((tag, i) => (
        <motion.span
          key={tag}
          className="px-2 py-1 bg-white/5 rounded text-xs text-white/70"
          layout="position"
          transition={smoothTransition}
          initial={!isExpanded && i >= 3 ? { opacity: 0, scale: 0.8 } : undefined}
          animate={{ opacity: 1, scale: 1 }}
        >
          {tag}
        </motion.span>
      ))}
      {!isExpanded && tags.length > 3 && (
        <span className="px-2 py-1 text-xs bg-white/10 rounded-md">
          +{tags.length - 3} more
        </span>
      )}
    </motion.div>
  );
} 