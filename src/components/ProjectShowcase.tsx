import { useState } from 'react';
import { projects } from '../data';
import type { Project } from '../data';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
import { useDialog } from '../hooks/useDialog';
import { projectMedia } from '../projectMedia';
const projectGroups: Record<string, string[]> = {
  careflow: ['Data Engineering', 'AI/ML'],
  events: ['Full-Stack', 'AI/ML'],
  timetable: ['Algorithms'],
  rental: ['Full-Stack'],
};
export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  return (
    <article
      className={`project-card project-${project.slug}`}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return;
        const card = event.currentTarget;
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      }}
    >
      <button
        className="project-cover"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title} details`}
      >
        <span className="project-window">
          <span className="project-window-bar" aria-hidden="true">
            <span className="window-controls">
              <i />
              <i />
              <i />
            </span>
            <span>{project.title}</span>
            <Icon name="screen" size={11} />
          </span>
          <img
            src={projectMedia[project.slug][0].src}
            alt={projectMedia[project.slug][0].alt}
            width="1200"
            height="750"
            loading="lazy"
          />
        </span>
        <span className="project-image-count">
          <Icon name="layers" size={14} />
          {projectMedia[project.slug].length} views
        </span>
        <span className="project-cover-action">
          <Icon name="expand" size={22} />
          Explore Project
        </span>
      </button>
      <div className="project-card-content">
        <span className="project-category">{project.category.split(' / ')[0]}</span>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <div className="tags">
          {project.stack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <div className="project-card-bottom">
          <button onClick={() => onSelect(project)}>
            <Icon name="info" size={15} />
            View Details
          </button>
          <span>
            <strong>{project.metric}</strong>
            <small>{project.metricLabel}</small>
          </span>
        </div>
      </div>
    </article>
  );
}
export function ProjectShowcase({
  onSelect,
  onViewAll,
}: {
  onSelect: (project: Project) => void;
  onViewAll: () => void;
}) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          title="Selected work"
          description="Four different problems. Explore the interfaces, architecture and engineering decisions behind each project."
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <div
              className="reveal"
              style={{ transitionDelay: `${(index % 3) * 90}ms` }}
              key={project.slug}
            >
              <ProjectCard project={project} onSelect={onSelect} />
            </div>
          ))}
        </div>
        <div className="section-action reveal">
          <button className="button button-spectrum" onClick={onViewAll}>
            <Icon name="layers" size={19} />
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
export function ProjectGallery({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (project: Project) => void;
}) {
  const { dialog, closeButton, close } = useDialog(onClose);
  const [filter, setFilter] = useState('All');
  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((project) => projectGroups[project.slug].includes(filter));
  return (
    <dialog
      ref={dialog}
      className="gallery-dialog"
      aria-labelledby="gallery-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="modal-header">
        <h2 id="gallery-title">
          <span className="heading-icon">
            <Icon name="layers" />
          </span>
          All Projects
        </h2>
        <button
          ref={closeButton}
          className="icon-button"
          onClick={close}
          aria-label="Close project gallery"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="gallery-body">
        <div className="project-filters" role="group" aria-label="Filter projects">
          {['All', 'Full-Stack', 'Data Engineering', 'AI/ML', 'Algorithms'].map((group) => (
            <button key={group} onClick={() => setFilter(group)} aria-pressed={filter === group}>
              {group}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {filtered.length} projects shown
        </p>
        <div className="project-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </dialog>
  );
}
