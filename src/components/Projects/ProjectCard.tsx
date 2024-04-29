import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProjectCardProps {
    title: string;
    description: string;
  }

  const ProjectCard: React.FC<ProjectCardProps> = ({ title, description }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView();

    React.useEffect(() => {
      if (inView) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    }, [controls, inView]);

    const variants = {
      hidden: { x: '-100vw', opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="project-card"
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </motion.div>
    );
  };

export default ProjectCard;
