import React, { useState, useEffect, ReactElement } from 'react';
import './Flip.css';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import MJ from '../assets/MJ.png';
import DrawnText from '../DrawnText';

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

interface FlipCardBodyProps {
  body: ReactElement;
  borderColor?: string;
  handleFlip: (contentName: string) => void;
}

const FlipCardBody: React.FC<FlipCardBodyProps> = ({ body, borderColor, handleFlip }) => {
  const style: React.CSSProperties & { '--border-color': string } | {} = borderColor ? {
    '--border-color': borderColor
  } : {};

  const headerElement = <header style={{ display: "grid", gridTemplateColumns: "5% 7%", columnGap: "88%" }}>
    <img src={MJ} alt="MJ" onClick={() => handleFlip("home")} style={{ cursor: "pointer" }} />
    <nav style={{ display: "grid", gridTemplateColumns: "40% 40%", columnGap: "20%" }}>
      <a href="https://www.linkedin.com/in/nadeem-maida-29a4b11a1" >
        <img src={linkedin} alt="LinkedIn" />
      </a>
      <a href="https://github.com/NADEE-MJ" >

        <img src={github} alt="GitHub" />
      </a>
    </nav>
  </header >

  const footerElement = <footer style={{ display: "grid", gridTemplateColumns: "62% 8% 8% 22%" }}>
    <div></div>
    <button onClick={() => handleFlip('contact')} className='contact-link'>contact</button>
    <button onClick={() => handleFlip('skills')} className='skills-link'>skills</button>
    <p>© 2024 Nadeem Maida</p>
  </footer>

  const projectLinks = <div className='project-links' style={{ display: "grid", gridTemplateRows: "40% 20% 20% 20%" }}>
    <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Projects</h1>
    <button onClick={() => handleFlip('peppermint')}>peppermint</button>
    <button onClick={() => handleFlip('reft')}>rEFT</button>
    <button onClick={() => handleFlip('zsh')}>zsh</button>
  </div>

  return (
    <div className="border-container" style={style}>
      <div className="content-container">
        <div style={{ display: "grid", gridTemplateRows: "20% 60% 20%", height: "100%", width: "100%" }}>
          {headerElement}
          <div style={{ display: "grid", gridTemplateColumns: "75% 20%", gap: "5%", height: "100%", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
              {body}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {projectLinks}
            </div>
          </div>
          {footerElement}
        </div>
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

  const handleFlip = (contentName: string) => {
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
          </p>
          <p>
            Currently, I'm delving into the realms of low-level and systems programming, with a keen interest in mastering Rust and C.
          </p>
        </div>} handleFlip={handleFlip} />,
    },
    reft: {
      direction: "Y", content:
        <FlipCardBody body={<div style={{}}>
          <h1>rEFT</h1>

          <p>
            The name rEFT stands for Real Estate Fungible Token. We developed a platform called rEFT to simplify real estate investment by allowing
            property owners to convert their assets into fungible tokens, using the Ethereum blockchain for secure transactions. Each token
            represents a share of ownership in the property. I designed the smart contract, using Hardhat, Solidity, and OpenZepplin, that manages
            the tokenization and trading of these property rights. The website is built with NextJS.
          </p>

          <a href='https://github.com/reft-natan-m/reft' className='link'>github</a>
        </div>} handleFlip={handleFlip} borderColor={'#B000B5'} />,
    },
    peppermint: {
      direction: "Y", content:
        <FlipCardBody body={<button onClick={() => handleFlip('home')}>Back</button>} handleFlip={handleFlip} borderColor={'#10ADED'} />,
    },
    zsh: {
      direction: "Y", content:
        <FlipCardBody body={<button onClick={() => handleFlip('home')}>Back</button>} handleFlip={handleFlip} borderColor={'#FFA500'} />,
    },
    contact: {
      direction: "X", content:
        <FlipCardBody body={<button onClick={() => handleFlip('home')}>Back</button>} handleFlip={handleFlip} borderColor={'#FF0000'} />,
    },
    skills: {
      direction: "X", content:
        <FlipCardBody body={<button onClick={() => handleFlip('home')}>Back</button>} handleFlip={handleFlip} borderColor={'#00FF00'} />,
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
