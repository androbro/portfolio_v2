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
      className={`p-6 ${isExpanded ? 'md:w-1/2' : 'md:w-2/3'} flex flex-col`}
      animate={{
        width: isExpanded ? '50%' : '66.667%',
      }}
      transition={smoothTransition}
      layout="preserve-aspect"
    >
      <motion.div layout="position" className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
        <motion.h3 
          layout="position"
          className="text-2xl md:text-3xl font-light group-hover:text-accent transition-colors"
          transition={smoothTransition}
        >
          {project.title}
        </motion.h3>
        <motion.span 
          layout="position"
          className="text-white/60"
          transition={smoothTransition}
        >
          {project.year}
        </motion.span>
      </motion.div>

      <motion.p 
        layout="position"
        className={`text-white/80 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}
        animate={{
          height: isExpanded ? 'auto' : '3em',
        }}
        transition={smoothTransition}
      >
        {project.description}
      </motion.p>

      {/* Display tags if available */}
      {project.tags && (
        <motion.div layout="position">
          <ProjectTags tags={project.tags} isExpanded={isExpanded} smoothTransition={smoothTransition} />
        </motion.div>
      )}

      {/* Show more content when expanded */}
      <AnimatePresence mode="sync" initial={false}>
        {isExpanded && (
          <ProjectExpandedContent 
            key="project-expanded-content"
            project={project} 
            smoothTransition={smoothTransition} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        layout="position"
        className="flex items-center justify-between mt-auto pt-4"
        transition={smoothTransition}
      >
        <motion.button
          layout="position"
          type="button"
          onClick={handleNavigate}
          onKeyDown={handleNavigate}
          className="flex items-center text-accent hover:underline"
          transition={smoothTransition}
        >
          <motion.span layout="position">View Project</motion.span>
          <motion.span layout="position" className="ml-1">→</motion.span>
        </motion.button>
        
        <AnimatePresence mode="sync" initial={false}>
          {isExpanded ? (
            <motion.button
              key="collapse-button"
              type="button"
              onClick={handleCollapse}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={smoothTransition}
              layoutId="toggle-button"
            >
              Collapse
            </motion.button>
          ) : (
            <motion.button
              key="expand-button"
              type="button"
              onClick={handleCollapse}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={smoothTransition}
              layoutId="toggle-button"
            >
              Expand
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 