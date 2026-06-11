import React, { useState, useEffect } from 'react';

export const Hero: React.FC = () => {
  const fullText = "Hello there, I'm Jared Branscum";
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="container">
      <div className="hero-wrapper">
        <span className="hero-tag">Welcome to my space</span>
        <h1 className="hero-title" style={{ minHeight: '1.2em' }}>
          {typedText.slice(0, 17)}
          {typedText.length > 17 && (
            <span className="gradient-text">{typedText.slice(17)}</span>
          )}
          <span className="typing-cursor">|</span>
        </h1>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--text-primary)', fontWeight: 600, textAlign: 'center', marginBottom: '1rem' }}>
          Fullstack Software Engineer
        </h2>
        <p className="hero-subtitle">
          Systems-focused fullstack engineer with 4 years of experience in developing and deploying high-performance web applications, distributed systems, and modern user experiences.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};
