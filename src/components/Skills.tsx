import React from 'react';

interface Skill {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React & React Ecosystem', level: 90 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Next.js & Vite', level: 85 },
        { name: 'Redux & TanStack Query', level: 80 },
      ],
    },
    {
      title: 'Backend & System Design',
      skills: [
        { name: 'Node.js & Fastify/Express', level: 92 },
        { name: 'Java Spring Boot', level: 92 },
        { name: 'SQL & NoSQL', level: 88 },
        { name: 'Python & FastAPI', level: 85 },
        { name: 'REST APIs & Kafka', level: 85 },
      ],
    },
    {
      title: 'DevOps & Tooling',
      skills: [
        { name: 'CI/CD Pipelines (GitHub & Gitlab)', level: 87 },
        { name: 'Docker Containers', level: 80 },
        { name: 'Cloud (AWS / GCP)', level: 78 },
        { name: 'Git & Version Control', level: 95 },
      ],
    },
  ];

  return (
    <section id="skills" className="container">
      <h2>My <span className="gradient-text">Skillset</span></h2>
      <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
        A snapshot of my core technical competencies and proficiencies built across years of engineering practice.
      </p>
      
      <div className="skills-grid">
        {categories.map((category, index) => (
          <div key={index} className="skill-category glass-panel">
            <h3>{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, sIndex) => (
                <div key={sIndex} className="skill-item">
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div 
                      className="skill-bar-fill" 
                      style={{ width: `${skill.level}%` }}
                      data-testid={`skill-bar-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
