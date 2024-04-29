import React, { useState, useEffect, ReactElement } from 'react';
import ReactFlipCard from 'reactjs-flip-card';
import './Flip.css';  // Import your CSS for styling

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
  body2: ReactElement | null;
  footer: ReactElement;
}

const CardBody: React.FC<CardBodyProps> = ({ header, body, body2, footer }) => {
  return (
    <div>
      {header}
      <main>
        {body}
        {body2}
      </main>
      {footer}
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
    <h1>Welcome to My Portfolio</h1>
    <nav>
      <img src="linkedin.png" alt="LinkedIn" onClick={() => handleFlip('back')} />
      <img src="github.png" alt="GitHub" onClick={() => handleFlip('back')} />
    </nav>
  </header>

  const footerElement = <div>
    <p>© 2024 Your Name</p>
  </div>

  const projectLinks = <div>
    <button onClick={() => handleFlip('back')}>Project 1</button>
    <button onClick={() => handleFlip('third')}>Project 2</button>
    <button onClick={() => handleFlip('back')}>Project 3</button>
  </div>

  const contentElements: ContentElements = {
    home: {
      direction: "horizontal", content:
        <CardBody header={headerElement} body={<main>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        </main>} body2={projectLinks} footer={footerElement} />

    },
    back: {
      direction: "horizontal", content:
        <div>
          <button onClick={() => handleFlip('home')}>Back</button>
        </div>
    },
    third: {
      direction: "vertical", content:
        <div>
          <button onClick={() => handleFlip('home')}>Back to home from third</button>
        </div>
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
          containerCss={'resizeBasedOnParent'}
          flipTrigger={"disabled"}
          flipByProp={flip}
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
