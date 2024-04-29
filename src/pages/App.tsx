import React from 'react';
import Home from '../components/Home';
import Projects from '../components/Projects';
import Navbar from '../components/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};

export default App;