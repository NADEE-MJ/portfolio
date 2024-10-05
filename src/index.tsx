import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Flip from './Flip';
import Mobile from './mobile';

function throttle(callback: () => void, delay: number) {
  let previousCall = new Date().getTime();
  return function () {
    const time = new Date().getTime();

    if ((time - previousCall) >= delay) {
      previousCall = time;
      callback();
    }
  }
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  const cardMaxWidth = 960;
  const cardMaxHeight = 600;

  useEffect(() => {
    if (window.innerWidth < cardMaxWidth || window.innerHeight < cardMaxHeight) {
      setIsMobile(true);
    }

    const handleResize = throttle(() => {
      if (window.innerWidth < cardMaxWidth || window.innerHeight < cardMaxHeight) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  return isMobile ? <Mobile /> : <Flip />;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
