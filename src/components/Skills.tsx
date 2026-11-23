import { useState } from 'react';
import { skillGroups } from '../content';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
function SkillCard({ index }: { index: number }) {
  const [expanded, setExpanded] = useState(false);
  const group = skillGroups[index];
  const tools = expanded ? group.tools : group.tools.slice(0, 8);
  const more = Math.max(0, group.tools.length - 8);
  return (
    <article className={`glass-card skill-card skill-${index}`}>
      <div className="skill-card-head">
        <span className="category-icon">
          <Icon name={group.icon} size={25} />
        </span>
        <h3>{group.title}</h3>
      </div>
      <div className="skill-pills">
        {tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
        <button
          className="skill-more"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`skill-detail-${index}`}
        >
          {expanded ? 'Less' : more ? `+${more} tools & details` : 'Details'}
          <Icon name={expanded ? 'minus' : 'plus'} size={11} />
        </button>
      </div>
      <div id={`skill-detail-${index}`} hidden={!expanded}>
        <p className="skill-description">{group.description}</p>
        {'note' in group && <p className="skill-note">{group.note}</p>}
      </div>
    </article>
  );
}
export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading title="Technical Expertise" />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div
              className="reveal"
              key={group.title}
              style={{ transitionDelay: `${(index % 3) * 90}ms` }}
            >
              <SkillCard index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
