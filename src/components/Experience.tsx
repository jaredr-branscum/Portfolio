import React, { useState } from 'react';

interface Position {
  id: string;
  role: string;
  company: string;
  date: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
}

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('selfemployed');

  const positions: Position[] = [
    {
      id: 'selfemployed',
      role: 'Self Employed',
      company: '',
      date: '01/2025 – Present',
      location: 'Duluth, GA',
      description: 'Active management of personal investments and building the best Settlers of Catan AI Engine.',
      bullets: [
        'Leveraged AI-assisted development environments (including Google Antigravity) to accelerate development of a Settlers of Catan AI Engine.',
        'Systematically executed data-driven strategies based on market volatility.'
      ],
      skills: ['Python', 'Quantitative Trading', 'AI Integrations', 'Computer Vision', 'Gameplay Heuristic Models']
    },
    {
      id: 'veracode',
      role: 'Software Engineer',
      company: 'Veracode',
      date: '05/2022 – 10/2024',
      location: 'Atlanta, GA',
      description: 'Engineered backend task scheduling and configuration microservices for cloud-based web application security scanning.',
      bullets: [
        'Designed and implemented high-performance paginated Spring Boot REST endpoints to optimize sorting and delivery of enterprise application security scan data.',
        'Developed and maintained Infrastructure as Code (IaC) utilizing Terraform for greenfield deployments consisting of microservice backends and a microfrontend React SPA.',
        'Built reusable UI modules in React and Angular, using TanStack Query for client-side state caching and server-state sync.',
        'Resolved critical production downtime incidents, triaging and resolving blocked architectural issues.',
        'Practiced Test-Driven Development (TDD) and pair programming writing comprehensive test suites via Jest, JUnit, PHPUnit, Playwright, and Cypress.',
        'Executed runtime migrations, upgrading dependencies, and migrating legacy services from Java 8 to Java 17.'
      ],
      skills: ['AWS', 'Java', 'Spring Boot', 'Kafka', 'React', 'Angular', 'Vite', 'Docker', 'ArgoCD', 'Helm Charts', 'Terraform', 'TanStack Query', 'Gitlab', 'Swagger Codegen']
    },
    {
      id: 'ncr',
      role: 'Engineer I',
      company: 'NCR Corporation',
      date: '07/2021 – 05/2022',
      location: 'Atlanta, GA',
      description: 'Developed ATM remote teller assistance software.',
      bullets: [
        'Engineered real-time ATM network remote assistance features for remote teller software.',
        'Designed and developed a client-facing TypeScript SDK to integrate ATM software with remote teller services including video web conferencing and screensharing.',
        'Developed automated Jenkins CI/CD pipelines and version control workflows to support deployments.'
      ],
      skills: ['TypeScript', 'JavaScript','Java', 'Spring Boot', 'Cassandra', 'Redis', 'Internal Tools', 'Jenkins', 'Harness CI/CD', 'Github Enterprise']
    }
  ];

  const handleToggle = (id: string) => {
    // Prevent toggling if selecting text
    if (window.getSelection()?.toString()) return;
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="container">
      <h2>Work <span className="gradient-text">Experience</span></h2>
      <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
        A timeline of my professional roles and key contributions.
      </p>

      <div className="experience-timeline">
        {positions.map((pos) => {
          const isExpanded = expandedId === pos.id;
          return (
            <div key={pos.id} className="timeline-item">
              <div className="timeline-dot" />
              <div 
                className="experience-card glass-panel"
                onClick={() => handleToggle(pos.id)}
                data-testid={`experience-card-${pos.id}`}
                role="button"
                aria-expanded={isExpanded}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedId(expandedId === pos.id ? null : pos.id);
                  }
                }}
              >
                <div className="experience-header">
                  <div className="experience-title-group">
                    <h3>{pos.role}</h3>
                    <div className="experience-company">{pos.company}</div>
                  </div>
                  <div className="experience-meta">
                    <div className="experience-date">{pos.date}</div>
                    <div className="experience-location">{pos.location}</div>
                  </div>
                </div>

                <div className={`experience-toggle ${isExpanded ? 'expanded' : ''}`}>
                  <span>{isExpanded ? 'Show less' : 'Show achievements'}</span>
                  <svg 
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M1 1.5L6 6.5L11 1.5" />
                  </svg>
                </div>

                <div 
                  className={`experience-details ${isExpanded ? 'expanded' : ''}`}
                  data-testid={`experience-details-${pos.id}`}
                >
                  <p className="experience-description">{pos.description}</p>
                  <ul className="experience-bullets">
                    {pos.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="experience-skills">
                    {pos.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
