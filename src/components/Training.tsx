import { useDialog } from '../hooks/useDialog';
import { training } from '../content';
import type { Training } from '../content';
import { Icon } from './Icon';
export function TrainingCard({
  item,
  onSelect,
}: {
  item: Training;
  onSelect: (item: Training) => void;
}) {
  return (
    <article className="training-card">
      <button
        className={`training-cover training-${item.id}`}
        onClick={() => onSelect(item)}
        aria-label={`View ${item.title} training details`}
      >
        <span className="training-cover-icon">
          <Icon name="award" size={42} />
        </span>
        <strong>
          {item.issuer
            .split(' · ')[0]
            .replace('Information Technology Institute (ITI)', 'ITI')
            .replace('ITIDA / National Telecommunication Institute', 'ITIDA / NTI')}
        </strong>
        <span>{item.detail}</span>
        <span className="training-cover-action">
          <Icon name="info" size={15} />
          View Training Details
        </span>
      </button>
      <div className="training-caption">
        <h3>{item.title}</h3>
        <p>{item.issuer}</p>
      </div>
    </article>
  );
}
export function TrainingDetail({ item, onClose }: { item: Training; onClose: () => void }) {
  const { dialog, closeButton, close } = useDialog(onClose);
  return (
    <dialog
      ref={dialog}
      className="training-dialog"
      aria-labelledby="training-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="modal-header">
        <h2 id="training-title">Training & Credentials</h2>
        <button
          ref={closeButton}
          className="icon-button"
          onClick={close}
          aria-label="Close training details"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="training-detail-content">
        <span className="credential-emblem">
          <Icon name="award" size={45} />
        </span>
        <h3>{item.title}</h3>
        <p className="training-issuer">{item.issuer}</p>
        <div className="training-detail-meta">
          <span>{item.period}</span>
          <span>{item.detail}</span>
          {item.result && <strong>{item.result}</strong>}
        </div>
        <p>{item.description}</p>
        <p className="privacy-note">
          {item.evidence === 'supplied'
            ? 'Training details are presented from the supplied evidence. Original credential documents are kept private.'
            : 'This credential is listed in the supplied CV. No certificate preview or verification URL is presented.'}
        </p>
      </div>
    </dialog>
  );
}
export function TrainingGallery({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (item: Training) => void;
}) {
  const { dialog, closeButton, close } = useDialog(onClose);
  return (
    <dialog
      ref={dialog}
      className="gallery-dialog"
      aria-labelledby="training-gallery-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="modal-header">
        <h2 id="training-gallery-title">
          <span className="heading-icon">
            <Icon name="award" />
          </span>
          All Certifications & Training
        </h2>
        <button
          ref={closeButton}
          className="icon-button"
          onClick={close}
          aria-label="Close training gallery"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="gallery-body">
        <div className="training-grid">
          {training.map((item) => (
            <TrainingCard item={item} key={item.id} onSelect={onSelect} />
          ))}
        </div>
        <p className="additional-program">
          Additional program: Madkour Shoots — Madkour Academy, as listed in the supplied CV.
        </p>
      </div>
    </dialog>
  );
}
