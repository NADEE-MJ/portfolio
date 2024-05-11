import React, { useState, useEffect, ReactElement } from 'react';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import MJ from '../assets/MJ.png';
import DrawnText from '../DrawnText';
import './Flip.css';
import SkillsGrid from '../SkillsGrid';

interface FlipCardProps {
  frontContent: ReactElement | null;
  backContent: ReactElement | null;
  flip: boolean;
  direction: "X" | "Y";
}

const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent, flip, direction }) => {
  return (
    <div className={`card ${flip ? `flipped${direction}` : ''}`}>
      <div className='card-front'>
        {frontContent}
      </div>
      <div className={`card-back${direction}`}>
        {backContent}
      </div>
    </div>
  );
};

type ContentNames = "home" | "reft" | "peppermint" | "zsh" | "contact" | "skills";

interface FlipCardBodyProps {
  body: ReactElement;
  borderColor?: string;
  handleFlip: (contentName: ContentNames) => void;
}

const FlipCardBody: React.FC<FlipCardBodyProps> = ({ body, borderColor, handleFlip }) => {
  const style: React.CSSProperties & { '--border-color': string } | {} = borderColor ? {
    '--border-color': borderColor
  } : {};

  const headerElement = (<div className='card-header'>
    <img className='logo' src={MJ} alt="MJ" onClick={() => handleFlip("home")} />

    <div className="header-links">
      <button className='link' onClick={() => handleFlip('skills')}>skills</button>
      <button className='link' onClick={() => handleFlip('contact')}>contact</button>
    </div>
    <div></div>
    <nav className='header-logos'>
      <a href="https://www.linkedin.com/in/nadeem-maida-29a4b11a1" >
        <img className='logo' src={linkedin} alt="LinkedIn" />
      </a>
      <a href="https://github.com/NADEE-MJ" >
        <img className='logo' src={github} alt="GitHub" />
      </a>
    </nav>
  </div>);

  const footerElement = (<div className='card-footer'>
    <p>© 2024 Nadeem Maida</p>
  </div>);

  const projectLinks = (<div className='project-links'>
    <h1>Projects</h1>
    <button className='link' onClick={() => handleFlip('peppermint')}>peppermint</button>
    <button className='link' onClick={() => handleFlip('reft')}>rEFT</button>
    <button className='link' onClick={() => handleFlip('zsh')}>zsh</button>
  </div>);

  return (
    <div className="border-container" style={style}>
      <div className="content-container">
        <header>
          {headerElement}
        </header>
        <div className='body-container'>
          <div className='left-body-container'>
            {body}
          </div>
          <div className='right-body-container'>
            {projectLinks}
          </div>
        </div>
        <footer>
          {footerElement}
        </footer>
      </div>
    </div>
  );
}

interface ContentElements {
  [key: string]: {
    direction: "X" | "Y";
    content: ReactElement;
  }
}

const Flip: React.FC = () => {
  const [flip, setFlip] = useState(false);
  const [nextContentName, setNextContentName] = useState<string>("home");
  const [frontContent, setFrontContent] = useState<ReactElement | null>(null);
  const [backContent, setBackContent] = useState<ReactElement | null>(null);
  const [direction, setDirection] = useState<"X" | "Y">('X');

  const handleFlip = (contentName: ContentNames) => {
    setFlip(flip => !flip);
    setNextContentName(contentName);
  };

  const contentElements: ContentElements = {
    home: {
      direction: "Y", content:
        <FlipCardBody body={<div>
          <DrawnText text={"WELCOME!"} />
          <p>
            Hello! I'm Nadeem Maida, a full-stack web developer based in Southern California.
            My experience spans various web technology stacks, and I'm continually driven to expand my expertise.
            Currently, I'm delving into the realms of low-level and systems programming, with a keen interest in mastering Rust and C.
          </p>
        </div>} handleFlip={handleFlip} />,
    },
    reft: {
      direction: "Y", content:
        <FlipCardBody body={<div>
          <h1>rEFT</h1>

          <p>
            The name rEFT stands for Real Estate Fungible Token. We developed a platform called rEFT to simplify real estate investment by allowing
            property owners to convert their assets into fungible tokens, using the Ethereum blockchain for secure transactions. Each token
            represents a share of ownership in the property. I designed the smart contract, using Hardhat, Solidity, and OpenZepplin, that manages
            the tokenization and trading of these property rights. The website is built with NextJS.
          </p>

          <a href='https://github.com/reft-natan-m/reft'>
            <button className='link'>github</button>
          </a>
        </div>} handleFlip={handleFlip} borderColor={'#B000B5'} />,
    },
    peppermint: {
      direction: "Y", content:
        <FlipCardBody body={<div>
          <h1>peppermint</h1>

          <p>
            Peppermint is a comprehensive budgeting application designed to help users manage their finances effectively by tracking expenses,
            categorizing transactions, and visualizing budgets with intuitive graphs. The application was primarily built using Docker, SvelteKit
            for the frontend, FastAPI for the backend, and PostgreSQL for database management. As the main developer, I spearheaded the design of
            the database architecture and the development of both backend and frontend components.
          </p>

          <a href='https://github.com/NADEE-MJ/peppermint'>
            <button className='link'>github</button>
          </a>
        </div>} handleFlip={handleFlip} borderColor={'#10ADED'} />,
    },
    zsh: {
      direction: "Y", content:
        <FlipCardBody body={<div>
          <h1>zsh</h1>

          <p>
            I developed a custom zsh shell setup focused on efficiency, featuring essential plugins like powerlevel10k for a dynamic prompt,
            zsh-autosuggestions for quick command recall, and fzf for enhanced history search. Designed to streamline my workflow across various
            systems, this setup ensures quick and uniform installation on Arch, Debian, and Ubuntu, allowing me to get up and running seamlessly
            wherever I work.
          </p>

          <a href='https://github.com/NADEE-MJ/zsh'>
            <button className='link'>github</button>
          </a>
        </div>} handleFlip={handleFlip} borderColor={'#FFA500'} />,
    },
    contact: {
      direction: "X", content:
        <FlipCardBody body={<div>
          <div className="resume-download-container">
            <a href="/resume.pdf" download="resume.pdf">
              &darr; Download Resume
            </a>
          </div>
        </div>} handleFlip={handleFlip} borderColor={'#FF0000'} />,
    },
    skills: {
      direction: "X", content:
        <FlipCardBody body={<SkillsGrid />} handleFlip={handleFlip} borderColor={'#00FF00'} />,
    }
  }

  useEffect(() => {
    if (flip) {
      setDirection(d => contentElements[nextContentName].direction);
      setBackContent(contentElements[nextContentName].content);
    } else {
      setFrontContent(contentElements[nextContentName].content);
    }
  }, [flip, nextContentName]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className='page-container'>
      <div className='card-container'>
        <FlipCard frontContent={frontContent} backContent={backContent} flip={flip} direction={direction} />
      </div>
    </div >
  );
};

export default Flip;
