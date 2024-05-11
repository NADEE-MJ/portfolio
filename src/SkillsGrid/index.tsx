import React from 'react';
import './SkillsGrid.css';

import pythonLogo from '../assets/python.png';
import reactLogo from '../assets/react.png';
import svelteLogo from '../assets/svelte.png';
import dockerLogo from '../assets/docker.png';
import laravelLogo from '../assets/laravel.png';
import mariadbLogo from '../assets/mariadb.png';
import sstLogo from '../assets/sst.png';
import fastapiLogo from '../assets/fastapi.png';

interface Skill {
    name: string;
    image: string;
    link: string;
}

const skills: Skill[] = [
    { name: 'Python', image: pythonLogo, link: 'https://www.python.org/' },
    { name: 'SST', image: sstLogo, link: 'https://sst.dev/' },
    { name: 'Laravel', image: laravelLogo, link: 'https://laravel.com/' },
    { name: 'React', image: reactLogo, link: 'https://reactjs.org/' },
    { name: 'Docker', image: dockerLogo, link: 'https://www.docker.com/' },
    { name: 'Svelte', image: svelteLogo, link: 'https://svelte.dev/' },
    { name: 'MariaDB', image: mariadbLogo, link: 'https://mariadb.org/' },
    { name: 'FastAPI', image: fastapiLogo, link: 'https://fastapi.tiangolo.com/' },
];

const SkillsGrid: React.FC = () => {
    return (
        <div className="skills-grid">
            {skills.map((skill) => (
                <div className="skill" key={skill.name}>
                    <a href={skill.link}>
                        <img src={skill.image} alt={skill.name} />
                    </a>
                </div>
            ))}
        </div>
    );
}

export default SkillsGrid;