import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, padding: '20px', zIndex: 1000 }}>
      <button onClick={() => {
        console.log("Button clicked");  // Testing the button
        setIsOpen(!isOpen);
      }} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
        ☰
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '0',
          backgroundColor: '#333',
          border: '1px solid #fff',
          borderRadius: '5px',
          padding: '10px',
          width: '150px'
        }}>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ margin: '10px 0', textAlign: 'right' }}><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
            <li style={{ margin: '10px 0', textAlign: 'right' }}><a href="/skills" style={{ color: 'white', textDecoration: 'none' }}>Skills</a></li>
            <li style={{ margin: '10px 0', textAlign: 'right' }}><a href="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</a></li>
            <li style={{ margin: '10px 0', textAlign: 'right' }}><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
