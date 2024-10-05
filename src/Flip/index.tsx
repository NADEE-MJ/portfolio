import React, { useState, useEffect, ReactElement } from 'react';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import MJ from '../assets/MJ.png';
import DrawnText from '../DrawnText';
import './Flip.css';
import contentJson from '../content.json';
import { FlipCardProps, ContentNames, FlipCardBodyProps, ContentElements, Content } from '../types';

const content: Content = contentJson as Content;

/**
 * FlipCard component that displays front and back content on a card that flips on the X or Y axis.
 * @param frontContent - The content to display on the front of the card.
 * @param backContent - The content to display on the back of the card.
 * @param flip - A boolean that determines if the card is flipped.
 * @param direction - The axis on which the card flips. Can be either "X" or "Y".
 * @returns JSX element that displays the front and back content on a card that flips on the X or Y axis.
 */
const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent, flip, direction }) => {
  return (
    <div className={`card ${flip ? `flipped${direction}` : ''}`}>
      <div className='card-front'>
        {frontContent}
      </div>
      <div className={`card-back${direction}`}>
        {backContent}
      </div>
    </div>
  );
};

/**
 * FlipCardBody component that displays the body content of the card.
 * @param body - The body content to display on the card.
 * @param borderColor - The color of the border around the card.
 * @param handleFlip - A function that flips the card to a different content.
 * @returns JSX element that displays the body content of the card.
 */
const FlipCardBody: React.FC<FlipCardBodyProps> = ({ body, borderColor, handleFlip }) => {
  const style: React.CSSProperties & { '--border-color': string } | {} = borderColor ? {
    '--border-color': borderColor
  } : {};

  const headerElement = (<div className='card-header'>
    <img className='logo' src={MJ} alt="MJ" onClick={() => handleFlip("home")} />

    <div className="header-links">
      <button className='link' onClick={() => handleFlip('skills')}>skills</button>
      <button className='link' onClick={() => handleFlip('contact')}>contact</button>
    </div>
    <div></div>
    <nav className='header-logos'>
      <a href="https://www.linkedin.com/in/nadeem-maida-29a4b11a1" >
        <img className='logo' src={linkedin} alt="LinkedIn" />
      </a>
      <a href="https://github.com/NADEE-MJ" >
        <img className='logo' src={github} alt="GitHub" />
      </a>
    </nav>
  </div>);

  const footerElement = (<div className='card-footer'>
    <p>© 2024 Nadeem Maida</p>
  </div>);

  const projectLinks = (<div className='project-links'>
    <h1>Projects</h1>
    {content.projects.map((project) => (
      <button className='link' onClick={() => handleFlip(project.button)}>{project.button}</button>
    ))}
  </div>);

  return (
    <div className="border-container" style={style}>
      <div className="content-container">
        <header>
          {headerElement}
        </header>
        <div className='body-container'>
          <div className='left-body-container'>
            {body}
          </div>
          <div className='right-body-container'>
            {projectLinks}
          </div>
        </div>
        <footer>
          {footerElement}
        </footer>
      </div>
    </div>
  );
}



/**
 * Flip component that displays a card with front and back content that flips on the X or Y axis.
 * @returns JSX element that displays a card with front and back content that flips on the X or Y axis.
 */
const Flip: React.FC = () => {
  const [flip, setFlip] = useState(false);
  const [nextContentName, setNextContentName] = useState<string>("home");
  const [frontContent, setFrontContent] = useState<ReactElement | null>(null);
  const [backContent, setBackContent] = useState<ReactElement | null>(null);
  const [direction, setDirection] = useState<"X" | "Y">('X');

  const handleFlip = (contentName: ContentNames) => {
    setFlip(flip => !flip);
    setNextContentName(contentName);
  };

  const [contentElements, setContentElements] = useState<ContentElements>({
    home: {
      direction: "Y", content:
        <FlipCardBody body={<div className="body-content">
          <DrawnText text={content.home.welcomeText} />
          <p>
            {content.home.introduction}
          </p>
        </div>} handleFlip={handleFlip} />,
    },
    contact: {
      direction: "X", content:
        <FlipCardBody body={
          <div className="body-content">
            <h1>{content.contact.heading}</h1>
            <p>{content.contact.message}</p>
            <div className='split-download-button'>
              <div className='body-content'>
                <span>Email:</span>
                <a href="mailto:nadeem.maida@gmail.com" className="email-button-link"><button className='email-button'>{content.contact.email}</button></a>
                <br />
                <span>Phone:</span>
                <span>{content.contact.phone}</span>
              </div>
              <div className="resume-download-container">
                <a href={content.contact.resumeLink} download={content.contact.resumeFileName}>
                  {content.contact.downloadText}
                </a>
              </div>
            </div>
          </div>} handleFlip={handleFlip} borderColor={'#10ADED'} />,
    },
    skills: {
      direction: "X", content:
        <FlipCardBody body={<div className="skills-grid">
          {content.skills.map((skill) => (
            <div className="skill" key={skill.name}>
              <a href={skill.link}>
                <img src={skill.image} alt={skill.name} />
              </a>
            </div>
          ))}
        </div>} handleFlip={handleFlip} borderColor={'#111135'} />,
    }
  });

  useEffect(() => {
    const updatedContentElements = { ...contentElements }; // Create a copy

    content.projects.forEach((project) => {
      updatedContentElements[project.button] = {
        direction: "Y",
        content: (
          <FlipCardBody
            body={
              <div className="body-content">
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                <a href={project.githubLink}>
                  <button className="link">github</button>
                </a>
              </div>
            }
            handleFlip={handleFlip}
            borderColor={project.borderColor}
          />
        ),
      };
    });

    setContentElements(updatedContentElements);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (flip) {
      setDirection(d => contentElements[nextContentName].direction);
      setBackContent(contentElements[nextContentName].content);
    } else {
      setFrontContent(contentElements[nextContentName].content);
    }
  }, [flip, nextContentName]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='page-container'>
      <div className='card-container'>
        <FlipCard frontContent={frontContent} backContent={backContent} flip={flip} direction={direction} />
      </div>
    </div >
  );
};

export default Flip;
