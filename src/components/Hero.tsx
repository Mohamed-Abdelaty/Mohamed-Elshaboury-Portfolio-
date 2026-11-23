import { useState } from 'react';
import { contact, projects } from '../data';
import type { Project } from '../data';
import { projectMedia } from '../projectMedia';
import { Icon } from './Icon';
import { useTypewriter } from '../hooks/useTypewriter';
export function SocialLinks() {
  return (
    <div className="social-links">
      <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <Icon name="github" size={20} />
      </a>
      <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <span className="linkedin-symbol" aria-hidden="true">
          in
        </span>
      </a>
      <a href={`mailto:${contact.email}`} aria-label="Send an email">
        <Icon name="mail" size={20} />
      </a>
    </div>
  );
}
export function Hero({ onSelect }: { onSelect: (project: Project) => void }) {
  const role = useTypewriter();
  const [active, setActive] = useState(0);
  const project = projects[active],
    media = projectMedia[project.slug];
  return (
    <section id="home" className="hero hero-studio">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-signature">
            Mohamed Elshaboury<span>Software, data & design</span>
          </p>
          <h1>
            From interface
            <br />
            to <span>infrastructure.</span>
          </h1>
          <div
            className="typewriter"
            aria-label="Full-Stack Developer, Big Data Engineer, UI/UX Designer"
          >
            <span className="role-mark" aria-hidden="true" />
            <span aria-hidden="true">
              {role}
              <i />
            </span>
          </div>
          <p className="hero-description">
            I connect thoughtful interfaces with the systems behind them. Full-stack applications,
            distributed data pipelines and practical machine-learning solutions, built with care
            from concept to delivery.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore My Work
            </a>
            <a className="button button-outline" href="#contact">
              Let’s Talk
            </a>
          </div>
          <div className="hero-contact-row">
            <SocialLinks />
            <span>
              Based in Egypt
              <br />
              <strong>Open to engineering opportunities</strong>
            </span>
          </div>
        </div>
        <div className={`hero-workbench project-${project.slug}`}>
          <div className="workbench-label">
            <Icon name="layers" size={17} />
            <span>A look inside my work</span>
            <span>4 case studies</span>
          </div>
          <button
            className="workbench-preview"
            onClick={() => onSelect(project)}
            aria-label={`Explore ${project.title} gallery`}
          >
            <img
              key={media[0].src}
              src={media[0].src}
              alt={media[0].alt}
              width={media[0].width}
              height={media[0].height}
              fetchPriority="high"
            />
            <span>
              <Icon name="expand" size={18} />
              Open the project
            </span>
          </button>
          <div className="workbench-caption">
            <div>
              <span>{project.category.split(' / ')[0]}</span>
              <h2>{project.title}</h2>
            </div>
            <strong>
              {media.length}
              <small>project views</small>
            </strong>
          </div>
          <div className="workbench-tabs" role="group" aria-label="Preview a featured project">
            {projects.map((item, index) => (
              <button
                key={item.slug}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                {['CareFlow', 'Events', 'Timetable', 'CarAgencies'][index]}
              </button>
            ))}
          </div>
          <div className="workbench-focus">
            <Icon name="code" size={15} />
            <span>{project.stack.slice(0, 3).join(' / ')}</span>
            <span>Explore the thinking behind the interface</span>
          </div>
        </div>
      </div>
      <div className="container hero-baseline">
        <span>Full-stack development</span>
        <span>Distributed data systems</span>
        <span>UI/UX design</span>
      </div>
    </section>
  );
}
