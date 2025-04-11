"use client";

import type { ProjectItem } from "@/app/sanity/lib/transforms";
import { AnimatePresence, motion } from "motion/react";
import { ProjectExpandedContent } from "./ProjectExpandedContent";
import { ProjectTags } from "./ProjectTags";

interface ProjectContentProps {
  project: ProjectItem;
  isExpanded: boolean;
  smoothTransition: {
    type: string;
    duration: number;
    ease: string;
  };
  handleNavigate: (e: React.MouseEvent | React.KeyboardEvent) => void;
  handleCollapse: (e: React.MouseEvent) => void;
}

export function ProjectContent({ 
  project, 
  isExpanded, 
  smoothTransition, 
  handleNavigate, 
  handleCollapse 
}: ProjectContentProps) {
  return (
    <motion.div 
      className={`p-6 ${isExpanded ? 'md:w-1/2' : 'md:w-2/3'}`}
      animate={{
        width: isExpanded ? '50%' : '66.667%',
      }}
      transition={smoothTransition}
      layout
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
        <h3 className="text-2xl md:text-3xl font-light group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <span className="text-white/60">{project.year}</span>
      </div>

      <motion.p 
        className={`text-white/80 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}
        animate={{
          height: isExpanded ? 'auto' : '3em',
        }}
        transition={smoothTransition}
      >
        {project.description}
      </motion.p>

      {/* Display tags if available */}
      {project.tags && <ProjectTags tags={project.tags} isExpanded={isExpanded} smoothTransition={smoothTransition} />}

      {/* Show more content when expanded */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <ProjectExpandedContent project={project} smoothTransition={smoothTransition} />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={handleNavigate}
          onKeyDown={handleNavigate}
          className="flex items-center text-accent hover:underline"
        >
          <span>View Project</span>
          <span className="ml-1">→</span>
        </button>
        
        {isExpanded && (
          <motion.button
            type="button"
            onClick={handleCollapse}
            className="text-white/60 hover:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...smoothTransition, delay: 0.4 }}
          >
            Collapse
          </motion.button>
        )}
      </div>
    </motion.div>
  );
} 