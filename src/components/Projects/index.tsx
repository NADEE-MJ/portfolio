import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
    title: string;
    description: string;
    }

const Projects: React.FC = () => {
  const projects: Project[] = [
    { title: 'Project 1', description: 'This is an awesome project.' },
    { title: 'Project 2', description: 'This is another awesome project.' },
    { title: 'Project 3', description: 'Yet another awesome project.' }
  ];

  return (
    <div className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} title={project.title} description={project.description}  />
        ))}
      </div>
    </div>
  );
};

export default Projects;
