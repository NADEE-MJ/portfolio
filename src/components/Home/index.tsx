import React from 'react';
import BackgroundCanvas from './BakgroundCanvas';

const Home: React.FC = () => {
  return (
    <div style={{ color: 'white', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <BackgroundCanvas />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h1>Welcome to My Portfolio</h1>
        <p>This is where your journey begins...</p>
      </div>
    </div>
  );
};

export default Home;