import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
  const skills = ['React', 'TypeScript', 'CSS', 'Framer Motion'];
  return (
    <motion.div initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 50 }}
      style={{ padding: '20px' }}>
      <h2>Skills and Expertise</h2>
      <ul>
        {skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Skills;