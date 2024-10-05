import React from 'react';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import MJ from '../assets/MJ.png';
import './Mobile.css';
import { Content, ProjectProps } from '../types';
import contentJson from '../content.json';

const content: Content = contentJson as Content;

const Mobile: React.FC = () => {
    return (
        <div className="mobile-site">
            <Header />
            <HomeSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

const Header: React.FC = () => (
    <header className="mobile-header">
        <img className="mobile-logo" src={MJ} alt="MJ" />
        {/* <nav className="mobile-nav-links">
            <a href="#home" className="mobile-nav-link">Home</a>
            <a href="#projects" className="mobile-nav-link">Projects</a>
            <a href="#skills" className="mobile-nav-link">Skills</a>
            <a href="#contact" className="mobile-nav-link">Contact</a>
        </nav> */}
    </header>
);

const HomeSection: React.FC = () => (
    <section id="home" className="mobile-section mobile-home-section">
        <h1 className="mobile-welcome-text">{content.home.welcomeText}</h1>
        <p>{content.home.introduction}</p>
    </section>
);

const ProjectsSection: React.FC = () => (
    <section id="projects" className="mobile-section mobile-projects-section">
        <h1>Projects</h1>
        {content.projects.map((project, index) => (
            <Project
                key={index}
                title={project.title}
                description={project.description}
                githubLink={project.githubLink}
                borderColor={project.borderColor}
            />
        ))}
    </section>
);

const Project: React.FC<ProjectProps> = ({ title, description, githubLink, borderColor }) => (
    <div className="mobile-project" style={{ borderLeftColor: borderColor }}>
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={githubLink} className="mobile-github-link" target="_blank" rel="noopener noreferrer">
            View on GitHub
        </a>
    </div>
);

const SkillsSection: React.FC = () => (
    <section id="skills" className="mobile-section mobile-skills-section">
        <h1>Skills</h1>
        <div className="mobile-skills-grid">
            {content.skills.map((skill) => (
                <div className="mobile-skill" key={skill.name}>
                    <a href={skill.link}>
                        <img src={skill.image} alt={skill.name} />
                    </a>
                </div>
            ))}
        </div>
    </section>
);

const ContactSection: React.FC = () => (
    <section id="contact" className="mobile-section mobile-contact-section">
        <h1>{content.contact.heading}</h1>
        <p>{content.contact.message}</p>
        <div className="mobile-contact-info">
            <div className="mobile-contact-item">
                <span>Email:</span>
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
            </div>
            <div className="mobile-contact-item">
                <span>Phone:</span>
                <span>{content.contact.phone}</span>
            </div>
        </div>
        <div className="mobile-resume-download">
            <a href={content.contact.resumeLink} download={content.contact.resumeFileName}>
                {content.contact.downloadText}
            </a>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="mobile-footer">
        <nav className="mobile-social-links">
            <a href={content.accounts.linkedin} target="_blank" rel="noopener noreferrer">
                <img className="mobile-social-icon" src={linkedin} alt="LinkedIn" />
            </a>
            <a href={content.accounts.github} target="_blank" rel="noopener noreferrer">
                <img className="mobile-social-icon" src={github} alt="GitHub" />
            </a>
        </nav>
        <p>{content.footer.copyright}</p>
    </footer>
);

export default Mobile;
