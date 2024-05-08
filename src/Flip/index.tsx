import React, { useState, useEffect, ReactElement } from 'react';
import './Flip.css';
import GlitchText from '../GlitchText';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import MJ from '../assets/MJ.png';

interface CardProps {
  content: ReactElement | null;
}

const Card: React.FC<CardProps> = ({ content }) => {
  return (
    content
  );
};

interface CardBodyProps {
  header: ReactElement;
  body: ReactElement;
  body2?: ReactElement;
  footer: ReactElement;
  borderColor?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ header, body, body2, footer, borderColor }) => {
  const style: React.CSSProperties & { '--border-color': string } | {} = borderColor ? {
    '--border-color': borderColor
  } : {};

  let main: ReactElement | null = null;

  if (body2) {
    main = <div style={{ display: "grid", gridTemplateColumns: "75% 20%", gap: "5%", height: "100%", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {body}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {body2}
      </div>
    </div>
  } else {
    main = <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {body}
    </div>
  }


  return (
    <div className="border-container" style={style}>
      <div className="content-container">
        <div style={{ display: "grid", gridTemplateRows: "20% 60% 20%", height: "100%", width: "100%" }}>
          {header}
          {main}
          {footer}
        </div>
      </div>
    </div>
  );
}


interface ContentElements {
  [key: string]: {
    direction: "horizontal" | "diagonal" | "vertical";
    content: ReactElement;
  }
}

const Flip: React.FC = () => {
  const [flip, setFlip] = useState(false);
  const [nextContentName, setNextContentName] = useState<string>("home");
  const [frontContent, setFrontContent] = useState<ReactElement | null>(null);
  const [backContent, setBackContent] = useState<ReactElement | null>(null);
  const [direction, setDirection] = useState<"horizontal" | "diagonal" | "vertical">('horizontal');

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

  const contentElements: ContentElements = {
    home: {
      direction: "horizontal", content:
        <CardBody header={headerElement} body={<div>
          <GlitchText text="WELCOME" />
          <p>
            Hello! I'm Nadeem Maida, a full-stack web developer based in Southern California.
            My experience spans various web technology stacks, and I'm continually driven to expand my expertise.
          </p>
          <br />
          <p>
            Currently, I'm delving into the realms of low-level and systems programming, with a keen interest in mastering Rust and C.
          </p>
        </div>} body2={projectLinks} footer={footerElement} />,
    },
    back: {
      direction: "horizontal", content:
        <CardBody header={headerElement} body={<button onClick={() => handleFlip('home')}>Back</button>} footer={footerElement} borderColor={'rgb(255, 0, 255)'} />,
    },
    third: {
      direction: "vertical", content:
        <CardBody header={headerElement} body={<button onClick={() => handleFlip('home')}>Back To the Home Page</button>} footer={footerElement} borderColor={'rgb(3, 255, 255)'} />,
    }
  }

  const handleFlip = (contentName: string) => {
    setFlip(flip => !flip);
    setNextContentName(contentName);
  };

  useEffect(() => {
    setDirection(d => contentElements[nextContentName].direction);
    if (flip) {
      setBackContent(contentElements[nextContentName].content);
      // setFrontContent(null);
    } else {
      setFrontContent(contentElements[nextContentName].content);
      // setBackContent(null);
    }
  }, [flip, nextContentName]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className='page-container'>
      <div className='card-container'>

        <div className={`card ${flip ? 'flipped' : ''}`}>
          <div className='card-front'>
            {frontContent}
          </div>
          <div className='card-back'>
            {backContent}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Flip;
