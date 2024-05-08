import React, { useState, useEffect, ReactElement } from 'react';
import './Flip.css';
import GlitchText from '../GlitchText';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import MJ from '../assets/MJ.png';

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

  const footerElement = <footer style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
    <p>© 2024 Nadeem Maida</p>
  </footer>

  const projectLinks = <div className='project-links'>
    <button onClick={() => handleFlip('back')}>Project 1</button>
    <button onClick={() => handleFlip('third')}>Project 2</button>
    <button onClick={() => handleFlip('back')}>Project 3</button>
  </div>

  return (
    <div className="border-container" style={style}>
      <div className="content-container">
        <div style={{ display: "grid", gridTemplateRows: "20% 60% 20%", height: "100%", width: "100%" }}>
          {headerElement}
          <div style={{ display: "grid", gridTemplateColumns: "75% 20%", gap: "5%", height: "100%", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
          <GlitchText text="WELCOME" />
          <p>
            Hello! I'm Nadeem Maida, a full-stack web developer based in Southern California.
            My experience spans various web technology stacks, and I'm continually driven to expand my expertise.
          </p>
          <br />
          <p>
            Currently, I'm delving into the realms of low-level and systems programming, with a keen interest in mastering Rust and C.
          </p>
        </div>} handleFlip={handleFlip} />,
    },
    back: {
      direction: "Y", content:
        <FlipCardBody body={<button onClick={() => handleFlip('home')}>Back</button>} handleFlip={handleFlip} borderColor={'#B000B5'} />,
    },
    third: {
      direction: "X", content:
        <FlipCardBody body={<button onClick={() => handleFlip('home')}>Back To the Home Page</button>} handleFlip={handleFlip} borderColor={'#10ADED'} />,
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
