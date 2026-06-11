import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Ambient backgrounds */}
      <div className="ambient-background" aria-hidden="true">
        <div className="glow-blob-1" />
        <div className="glow-blob-2" />
        <div className="glow-blob-3" />
      </div>

      {/* Floating navigation header */}
      <header className="nav-header">
        <div className="container nav-container">
          <a href="#hero" className="logo">
            Portfolio<span className="logo-dot" />
          </a>
          <nav>
            <ul className="nav-links">
              <li>
                <a 
                  href="#hero" 
                  className={activeSection === 'hero' ? 'active' : ''}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className={activeSection === 'skills' ? 'active' : ''}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  className={activeSection === 'experience' ? 'active' : ''}
                >
                  Experience
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className={activeSection === 'projects' ? 'active' : ''}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={activeSection === 'contact' ? 'active' : ''}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content sections */}
      <main style={{ marginTop: 'var(--header-height)' }}>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Jared Branscum. All rights reserved. Designed with cool vibes.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
