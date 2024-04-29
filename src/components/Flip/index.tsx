import React, { useState, useEffect } from 'react';
import ReactFlipCard from 'reactjs-flip-card';
import './Flip.css';  // Import your CSS for styling

interface CardProps {
  content: any;
}


const Card = ({ content }: CardProps) => {
  return (
    content
  );
};

interface ContentElements {
  [key: string]: any;
}

const Flip = () => {
  const [flip, setFlip] = useState(true);


  const contentElements: ContentElements = {
    "home": <div><header>
      <h1>Welcome to My Portfolio</h1>
      <nav>
        <img src="linkedin.png" alt="LinkedIn" onClick={() => handleFlip('back')} />
        <img src="github.png" alt="GitHub" onClick={() => handleFlip('back')} />
      </nav>
    </header>
      <main>
        <button onClick={() => handleFlip('back')}>Project 1</button>
        <button onClick={() => handleFlip('back')}>Project 2</button>
        <button onClick={() => handleFlip('back')}>Project 3</button>
      </main>
      <footer>
        © 2024 Your Name
      </footer></div>,
    "back": <div>
      <button onClick={() => handleFlip('home')}>Back</button>
    </div>,
  }

  const [frontContent, setFrontContent] = useState(null);
  const [backContent, setBackContent] = useState(null);

  const handleFlip = (contentName: string) => {
    // Toggle flip state
    setFlip(flip => !flip);
    // Now decide which content to set based on the new state
    // Re-run this effect when `flip` or `contentName` changes
  };

  useEffect(() => {
    setFrontContent(contentElements['home']);
    setBackContent(contentElements['back']);
  }, []);

  return (
    <div className='page-container'>

      <div className='card-container'>


        <ReactFlipCard
          containerCss={'resizeBasedOnParent'}
          flipTrigger={"disabled"}
          flipByProp={flip}
          frontStyle={{ background: '#00b3ad', color: 'white', borderRadius: 20, }}
          backStyle={{ background: '#00b3ad', color: 'white', borderRadius: 20, }}
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
