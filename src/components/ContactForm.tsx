import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Thank you for your message from ${email}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ padding: '20px' }}>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" required />
        <button type="submit">Send</button>
      </form>
    </motion.div>
  );
};

export default ContactForm;