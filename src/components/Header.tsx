import React from 'react';
import { Link } from 'react-scroll';

const Header: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="home" smooth={true} duration={500} offset={-70}>Home</Link></li>
                <li><Link to="skills" smooth={true} duration={500} offset={-70}>Skills</Link></li>
                <li><Link to="projects" smooth={true} duration={500} offset={-70}>Projects</Link></li>
                <li><Link to="contact" smooth={true} duration={500} offset={-70}>Contact</Link></li>
            </ul>
        </nav>
    );
  };

export default Header;
