import { useEffect, useRef, useState } from 'react';
import { projectMedia } from '../projectMedia';
import type { ProjectMedia } from '../projectMedia';
import { useDialog } from '../hooks/useDialog';
import { Icon } from './Icon';

function MediaViewer({
  media,
  index,
  onChange,
  onClose,
}: {
  media: ProjectMedia[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const { dialog, closeButton, close } = useDialog(onClose);
  const [actualSize, setActualSize] = useState(false);
  const item = media[index];
  const change = (direction: number) => {
    setActualSize(false);
    onChange((index + direction + media.length) % media.length);
  };
  return (
    <dialog
      ref={dialog}
      className="media-viewer"
      aria-label="Project image viewer"
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          event.stopPropagation();
          change(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <div className="viewer-toolbar">
        <div>
          <strong>{item.title}</strong>
          <span>
            {index + 1} / {media.length}
          </span>
        </div>
        <button
          className="viewer-size"
          onClick={() => setActualSize(!actualSize)}
          aria-pressed={actualSize}
        >
          <Icon name={actualSize ? 'minus' : 'plus'} size={17} />
          {actualSize ? 'Fit to screen' : 'Actual size'}
        </button>
        <button
          ref={closeButton}
          className="icon-button"
          onClick={close}
          aria-label="Close image viewer"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className={`viewer-canvas ${actualSize ? 'actual-size' : ''}`}>
        <img key={item.src} src={item.src} alt={item.alt} width={item.width} height={item.height} />
      </div>
      <div className="viewer-navigation">
        <button onClick={() => change(-1)}>
          <Icon name="chevronRight" className="previous-icon" size={18} />
          Previous image
        </button>
        <p>Arrow keys to browse · Escape to return</p>
        <button onClick={() => change(1)}>
          Next image
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
    </dialog>
  );
}

export function ProjectMediaGallery({ slug }: { slug: string }) {
  const media = projectMedia[slug];
  const [index, setIndex] = useState(0),
    [expanded, setExpanded] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const item = media[index];
  const change = (direction: number) =>
    setIndex((value) => (value + direction + media.length) % media.length);
  useEffect(() => {
    const element = rail.current;
    const selected = element?.children[index] as HTMLElement | undefined;
    if (element && selected)
      element.scrollTo?.({
        left: selected.offsetLeft - (element.clientWidth - selected.offsetWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
  }, [index]);
  return (
    <section
      id="case-media"
      className="project-media"
      aria-label="Project media gallery"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          change(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <div className="media-heading">
        <span>Project gallery</span>
        <strong>{media.length} views</strong>
      </div>
      <div
        className="media-main"
        onTouchStart={(event) => {
          touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const dx = event.changedTouches[0].clientX - start.x,
            dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) change(dx < 0 ? 1 : -1);
        }}
      >
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          decoding="async"
        />
      </div>
      <div className="media-caption">
        <div aria-live="polite">
          <span>
            {index + 1} / {media.length}
          </span>
          <strong>{item.title}</strong>
        </div>
        <button className="image-zoom" onClick={() => setExpanded(true)} aria-pressed={expanded}>
          <Icon name="expand" size={16} />
          Enlarge image
        </button>
      </div>
      <div className="media-controls">
        <button className="media-step" onClick={() => change(-1)} aria-label="Previous image">
          <Icon name="chevronRight" className="previous-icon" />
        </button>
        <div className="media-thumbnails" ref={rail} aria-label="Choose project image">
          {media.map((image, position) => (
            <button
              key={image.src}
              onClick={() => setIndex(position)}
              aria-label={`Show image ${position + 1}: ${image.title}`}
              aria-pressed={index === position}
            >
              <img src={image.thumbnail} alt="" width="160" height="85" loading="lazy" />
            </button>
          ))}
        </div>
        <button className="media-step" onClick={() => change(1)} aria-label="Next image">
          <Icon name="chevronRight" />
        </button>
      </div>
      <p className="media-context">
        Supplied project views and illustrations. Values shown belong to the captured dataset or
        demo state.
      </p>
      {expanded && (
        <MediaViewer
          media={media}
          index={index}
          onChange={setIndex}
          onClose={() => setExpanded(false)}
        />
      )}
    </section>
  );
}
