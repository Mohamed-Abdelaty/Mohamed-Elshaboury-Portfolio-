import type { ReactNode } from 'react';
export function SectionHeading({ title, description }: { title: ReactNode; description?: string }) {
  return (
    <div className="section-heading reveal">
      <h2>{title}</h2>
      <span className="heading-line" />
      {description && <p>{description}</p>}
    </div>
  );
}
