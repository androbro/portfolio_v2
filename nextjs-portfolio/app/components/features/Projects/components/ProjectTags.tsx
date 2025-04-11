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
      animate={{
        height: isExpanded ? 'auto' : 'auto',
      }}
      transition={smoothTransition}
    >
      {tags.slice(0, isExpanded ? tags.length : 3).map((tag) => (
        <motion.span
          key={tag}
          className="px-2 py-1 text-xs bg-white/10 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...smoothTransition, delay: 0.2 }}
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