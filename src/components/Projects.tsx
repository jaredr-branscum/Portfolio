import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type: 'public' | 'private';
  githubUrl?: string;
  liveUrl?: string;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');

  const projectsList: Project[] = [
    {
      id: 'deepcatananalysis',
      title: 'Deep Catan Analysis',
      description: 'AI Engine for Settlers of Catan, including game theory, statistical analysis, and gameplay heuristics.',
      tech: ['Python', 'Vite-based React', 'TypeScript', 'Swagger Codegen', 'Game Theory', 'Statistical Analysis', 'Gameplay Heuristic Models', 'Computer Vision'],
      type: 'private',
      liveUrl: 'https://www.insightelo.com/',
    },
    {
      id: 'smartvault',
      title: 'Smart Vault',
      description: 'Cloud-native digital receipt repository. Users can upload receipt documents, which are securely stored in S3-compatible cloud storage. Extracted metadata is tracked through an analytics dashboard, and past receipts can be inspected at any time through the interactive Vault Drawer UI.',
      tech: ['Next.js','TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'AWS S3', 'React', 'Docker', 'LocalStack AWS'],
      type: 'public',
      githubUrl: 'https://github.com/jaredr-branscum/Smart-Vault',
    },
    {
      id: 'mistychat',
      title: 'MistyChat',
      description: 'A responsive real-time messaging workspace with custom chat rooms using React and Firebase.',
      tech: ['Vite-based React', 'Javascript', 'Firebase', 'Tailwind CSS', 'Vite'],
      type: 'public',
      githubUrl: 'https://github.com/jaredr-branscum/MistyChat',
      liveUrl: 'https://jaredr-branscum.github.io/MistyChat/',
    },
  ];

  const filteredProjects = projectsList.filter(
    (p) => filter === 'all' || p.type === filter
  );

  return (
    <section id="projects" className="container">
      <h2>Featured <span className="gradient-text">Projects</span></h2>
      <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '1.1rem' }}>
        A collection of projects both personal and professional. Private codebases are marked and restricted from outbound link redirection.
      </p>

      {/* Filter Tabs */}
      <div className="projects-filter">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
          data-testid="filter-btn-all"
        >
          All Projects
        </button>
        <button
          className={`filter-btn ${filter === 'public' ? 'active' : ''}`}
          onClick={() => setFilter('public')}
          data-testid="filter-btn-public"
        >
          Public
        </button>
        <button
          className={`filter-btn ${filter === 'private' ? 'active' : ''}`}
          onClick={() => setFilter('private')}
          data-testid="filter-btn-private"
        >
          Private
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid" data-testid="projects-grid">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="project-card glass-panel animate-fade-in-up"
            data-testid={`project-card-${project.id}`}
          >
            <div className="project-badge-container">
              <span className={`project-type-badge ${project.type}`}>
                {project.type === 'public' ? 'Public Project' : 'Private Project'}
              </span>
            </div>
            
            <h3>{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            
            <div className="project-tech">
              {project.tech.map((t, index) => (
                <span key={index} className="badge">
                  {t}
                </span>
              ))}
            </div>

            <div className="project-links">
              {project.type === 'public' ? (
                <>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      data-testid={`github-link-${project.id}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      GitHub
                    </a>
                  )}
                </>
              ) : (
                <span className="private-badge-inline" data-testid={`private-badge-${project.id}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Confidential / Private
                </span>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  data-testid={`live-link-${project.id}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Visit Site
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
