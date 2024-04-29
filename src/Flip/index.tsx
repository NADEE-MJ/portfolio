import React, { useState, useEffect, ReactElement } from 'react';
import ReactFlipCard from 'reactjs-flip-card';
import './Flip.css';

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
  bracketColor?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ header, body, body2, footer, bracketColor }) => {
  const style: React.CSSProperties & { '--bracket-color': string } | {} = bracketColor ? {
    '--bracket-color': bracketColor
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
    <div className="bracket-container" style={style}>
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

  const headerElement = <header>
    <h1>Nadeem Maida</h1>
    <nav>
      <img src="linkedin.png" alt="LinkedIn" onClick={() => handleFlip('back')} />
      <img src="github.png" alt="GitHub" onClick={() => handleFlip('back')} />
    </nav>
  </header>

  const footerElement = <footer style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
    <p>© 2024 Nadeem Maida</p>
  </footer>

  const projectLinks = <div>
    <button onClick={() => handleFlip('back')}>Project 1</button>
    <button onClick={() => handleFlip('third')}>Project 2</button>
    <button onClick={() => handleFlip('back')}>Project 3</button>
  </div>

  const contentElements: ContentElements = {
    home: {
      direction: "horizontal", content:
        <CardBody header={headerElement} body={<div>
          <h1>Welcome to My Portfolio</h1>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        </div>} body2={projectLinks} footer={footerElement} />,
    },
    back: {
      direction: "horizontal", content:
        <CardBody header={headerElement} body={<button onClick={() => handleFlip('home')}>Back</button>} footer={footerElement} bracketColor={'rgb(255, 0, 255)'} />,
    },
    third: {
      direction: "vertical", content:
        <CardBody header={headerElement} body={<button onClick={() => handleFlip('home')}>Back To the Home Page</button>} footer={footerElement} bracketColor={'rgb(3, 255, 255)'} />,
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
      setFrontContent(null);
    } else {
      setFrontContent(contentElements[nextContentName].content);
      setBackContent(null);
    }
  }, [flip, nextContentName]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className='page-container'>
      <div className='card-container'>
        <ReactFlipCard
          containerCss={'resize-based-on-parent'}
          flipTrigger={"disabled"}
          flipByProp={flip}
          flipCardCss={'transition-slow'}
          direction={direction}
          frontCss='card'
          backCss='card'
          frontComponent={
            <Card content={frontContent} />
          }
          backComponent={
            <Card content={backContent} />
          }
        />
      </div>
    </div>
  );
};

export default Flip;
