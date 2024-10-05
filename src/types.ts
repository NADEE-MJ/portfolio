import { ReactElement } from "react";

// SkillsGrid
export interface Skill {
  name: string;
  image: string;
  link: string;
}

// Mobile
export interface ProjectProps {
  title: string;
  description: string;
  githubLink: string;
  borderColor: string;
}

// Flip
export interface FlipCardProps {
  frontContent: ReactElement | null;
  backContent: ReactElement | null;
  flip: boolean;
  direction: "X" | "Y";
}

export type ContentNames = "home" | "reft" | "peppermint" | "zsh" | "contact" | "skills";

export interface FlipCardBodyProps {
  body: ReactElement;
  borderColor?: string;
  handleFlip: (contentName: ContentNames) => void;
}

export interface ContentElements {
  [key: string]: {
    direction: "X" | "Y";
    content: ReactElement;
  };
}

// DrawnText
export interface AnimatedTextProps {
  text: string;
}

// Content
export interface Project {
  title: string;
  description: string;
  githubLink: string;
  borderColor: string;
  button: ContentNames;
}
export interface Content {
  home: {
    welcomeText: string;
    introduction: string;
  };
  projects: Project[];
  contact: {
    heading: string;
    message: string;
    email: string;
    phone: string;
    resumeLink: string;
    resumeFileName: string;
    downloadText: string;
  };
  accounts: {
    github: string;
    linkedin: string;
  };
  footer: {
    copyright: string;
  };
  skills: Skill[];
}
