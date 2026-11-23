import { useEffect, useRef, useState } from 'react';
import type { Project } from '../data';
import { projectStories } from '../projectStories';
import { useDialog } from '../hooks/useDialog';
import { Icon } from './Icon';
import { ProjectMediaGallery } from './ProjectMediaGallery';
const chapters = [
  ['case-media', 'Gallery'],
  ['case-overview', 'Overview'],
  ['case-engineering', 'Engineering'],
  ['case-results', 'Results'],
] as const;
export function ProjectDetail({
  project,
  onClose,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onNext?: () => void;
}) {
  const { dialog, closeButton, close } = useDialog(onClose);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [layer, setLayer] = useState(0),
    [chapter, setChapter] = useState<string>('case-media');
  useEffect(() => {
    const viewport = viewportRef.current!;
    let frame = 0;
    const update = () => {
      const edge = viewport.querySelector('.case-sticky')!.getBoundingClientRect().bottom + 32;
      let current: string = chapters[0][0];
      for (const [id] of chapters) {
        const heading = viewport.querySelector(`#${id}`);
        if (heading && heading.getBoundingClientRect().top <= edge) current = id;
      }
      if (viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 8)
        current = 'case-results';
      setChapter(current);
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    viewport.addEventListener('scroll', scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener('scroll', scroll);
    };
  }, []);
  const navigate = (id: string) => {
    const viewport = viewportRef.current!;
    const heading = viewport.querySelector<HTMLElement>(`#${id}`)!;
    const top =
      viewport.scrollTop +
      heading.getBoundingClientRect().top -
      viewport.getBoundingClientRect().top -
      viewport.querySelector<HTMLElement>('.case-sticky')!.offsetHeight -
      20;
    heading.focus({ preventScroll: true });
    viewport.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
    setChapter(id);
  };
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="case-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="case-scrollport" ref={viewportRef}>
        <div className="case-sticky">
          <div className="modal-header">
            <h2>
              <span className="project-category">{project.category.split(' / ')[0]}</span>
              {project.title}
            </h2>
            <button
              ref={closeButton}
              className="icon-button"
              onClick={close}
              aria-label="Close case study"
            >
              <Icon name="close" />
            </button>
          </div>
          <nav className="case-chapters" aria-label="Case study chapters">
            {chapters.map(([id, label]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                aria-current={chapter === id ? 'location' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="project-dialog-body">
          <ProjectMediaGallery slug={project.slug} />
          <h2 id="case-title">{project.title}</h2>
          <div className="case-snapshot">
            <div>
              <strong>{project.metric}</strong>
              <span>{project.metricLabel}</span>
            </div>
            <p>
              <span>Engineering focus</span>
              {projectStories[project.slug].focus}
            </p>
          </div>
          <h3>Technologies & tools</h3>
          <div className="tags">
            {project.stack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <h3 id="case-overview" tabIndex={-1}>
            Overview
          </h3>
          <p>{project.summary}</p>
          <h3>My role</h3>
          <p>{project.role}</p>
          <h3>The challenge</h3>
          <p>{project.challenge}</p>
          <h3 id="case-engineering" tabIndex={-1}>
            Engineering approach
          </h3>
          <p>{project.solution}</p>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={16} />
                {feature}
              </li>
            ))}
          </ul>
          <h3>Architecture</h3>
          <p className="small">
            Simplified from the project documentation. Select a layer to explore.
          </p>
          <div className="architecture-controls" role="group" aria-label="Architecture layers">
            {project.architecture.map((item, index) => (
              <button
                key={item}
                aria-pressed={layer === index}
                aria-controls="architecture-explanation"
                onClick={() => setLayer(index)}
              >
                <Icon name={(['screen', 'code', 'database', 'layers'] as const)[index]} size={20} />
                {item}
              </button>
            ))}
          </div>
          <p id="architecture-explanation" className="architecture-explanation" aria-live="polite">
            {projectStories[project.slug].architectureNotes[layer]}
          </p>
          <h3 id="case-results" tabIndex={-1}>
            Documented results
          </h3>
          <div className="case-result">
            <strong>{project.metric}</strong>
            <span>{project.metricLabel}</span>
          </div>
          <p>{project.result}</p>
          {project.note && <p className="evidence-note">{project.note}</p>}
          <div className="modal-actions">
            <a
              className="button button-primary"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" size={18} />
              Source Code
            </a>
            {onNext && (
              <button className="button button-secondary" onClick={onNext}>
                Next Project
                <Icon name="chevronRight" size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
