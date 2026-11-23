import { useState } from 'react';
import type { CSSProperties } from 'react';
import { contact, projects } from './data';
import type { Project } from './data';
import { experience, fullName, training, recognition } from './content';
import type { Training as TrainingType } from './content';
import { useReveal } from './hooks/useReveal';
import { Hero, SocialLinks } from './components/Hero';
import { Navigation } from './components/Navigation';
import { ProjectShowcase, ProjectGallery } from './components/ProjectShowcase';
import { ProjectDetail } from './components/ProjectDetail';
import { TrainingCard, TrainingDetail, TrainingGallery } from './components/Training';
import { SiteBackground } from './components/SiteBackground';
import { Icon } from './components/Icon';
import { SectionHeading } from './components/SectionHeading';
import { Skills } from './components/Skills';
const stagger = (index: number) => ({ transitionDelay: `${(index % 3) * 90}ms` }) as CSSProperties;
export default function App() {
  const [selected, setSelected] = useState<Project | null>(null),
    [projectGallery, setProjectGallery] = useState(false),
    [credential, setCredential] = useState<TrainingType | null>(null),
    [trainingGallery, setTrainingGallery] = useState(false);
  useReveal();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteBackground />
      <Navigation />
      <main id="main" className="page-main">
        <Hero onSelect={setSelected} />
        <ProjectShowcase onSelect={setSelected} onViewAll={() => setProjectGallery(true)} />
        <section id="about" className="section">
          <div className="container">
            <SectionHeading title="About Me" />
            <div className="about-layout">
              <div className="about-copy reveal from-left">
                <h3>Full-Stack Developer & Big Data Engineer</h3>
                <p>
                  I’m <strong>{fullName}</strong>, a Computer Science student at the Egypt-Japan
                  University of Science and Technology. My experience spans application development,
                  data engineering and digital product design.
                </p>
                <p>
                  I combine the analytical side of engineering—system architecture, APIs, data
                  processing and reliability—with the human side of software: clear interfaces,
                  usable workflows and attention to detail. Across more than 15 independent
                  projects, I’ve worked on web platforms, Android applications and browser-based
                  experiences.
                </p>
                <p>
                  I enjoy owning the full process: understanding the problem, choosing a practical
                  architecture, implementing the solution and refining how people interact with it.
                  My distributed data work brings together Kafka, Spark, HDFS and Airflow.
                </p>
              </div>
              <div className="about-stats">
                {[
                  ['15+', 'INDEPENDENT PROJECTS'],
                  ['8', 'REACT / NODE WEB APPS'],
                  ['2', 'NATIVE ANDROID APPS'],
                  ['97%', 'NTI TRAINING SCORE'],
                ].map(([value, label], index) => (
                  <div className="stat-card reveal" key={label} style={stagger(index)}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-values reveal">
              <span>Ownership</span>
              <span>Clarity</span>
              <span>Reliability</span>
              <span>Collaboration</span>
              <span>Continuous Learning</span>
            </div>
          </div>
        </section>
        <section id="education" className="section">
          <div className="container">
            <SectionHeading title="Education" />
            <div className="education-grid">
              <div className="reveal from-left">
                <article className="glass-card education-card">
                  <div className="education-card-head">
                    <span className="category-icon">
                      <Icon name="graduation" size={25} />
                    </span>
                    <div>
                      <span className="date-label">Expected 2027</span>
                      <h3>Egypt-Japan University of Science and Technology (E-JUST)</h3>
                      <p className="education-degree">B.Sc. in Computer Science</p>
                    </div>
                  </div>
                  <ul className="education-list">
                    <li>
                      <Icon name="book" size={16} />
                      Applying software-engineering and computing concepts to practical systems.
                    </li>
                    <li>
                      <Icon name="book" size={16} />
                      Academic work in distributed processing, backend architecture and software
                      reliability.
                    </li>
                    <li>
                      <Icon name="book" size={16} />
                      Connecting system design, full-stack implementation and thoughtful user
                      experience.
                    </li>
                  </ul>
                </article>
              </div>
              <div className="reveal from-right">
                <article className="glass-card education-card">
                  <div className="education-card-head">
                    <span className="category-icon color-cyan">
                      <Icon name="layers" size={25} />
                    </span>
                    <div>
                      <span className="date-label">Academic engineering project</span>
                      <h3>ChaosFlow — Distributed Data Pipelines</h3>
                      <p className="education-degree">Graduation-project work · E-JUST</p>
                    </div>
                  </div>
                  <ul className="education-list">
                    <li>
                      <Icon name="book" size={16} />
                      Configurable pipeline functionality with Python and FastAPI.
                    </li>
                    <li>
                      <Icon name="book" size={16} />
                      Kafka, Spark and HDFS integrations with Airflow orchestration.
                    </li>
                    <li>
                      <Icon name="book" size={16} />
                      Docker Compose, Prometheus, Grafana and resilience evaluation. This is
                      academic work, not employment at E-JUST.
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>
        <Skills />
        <section id="experience" className="section">
          <div className="container">
            <SectionHeading title="Professional Experience" />
            <div className="experience-timeline">
              {experience.map((item, index) => (
                <article
                  key={item.title}
                  className={`experience-row ${index % 2 ? 'right' : 'left'}`}
                >
                  <span className={`timeline-marker marker-${index}`}>
                    <Icon
                      name={(['code', 'database', 'pen', 'screen'] as const)[index]}
                      size={19}
                    />
                  </span>
                  <div
                    className={`timeline-card glass-card reveal ${index % 2 ? 'from-right' : 'from-left'}`}
                  >
                    <span className="timeline-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    <p className="experience-context">{item.context}</p>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="certifications" className="section">
          <div className="container">
            <SectionHeading title="Certifications & Training" />
            <div className="training-grid">
              {training.slice(0, 6).map((item, index) => (
                <div className="reveal" style={stagger(index)} key={item.id}>
                  <TrainingCard item={item} onSelect={setCredential} />
                </div>
              ))}
            </div>
            <div className="section-action reveal">
              <button className="button button-spectrum" onClick={() => setTrainingGallery(true)}>
                <Icon name="award" size={18} />
                View All Credentials
              </button>
            </div>
          </div>
        </section>
        <section id="achievements" className="section">
          <div className="container">
            <SectionHeading title="Achievements & Leadership" />
            <div className="recognition-grid">
              {recognition.map((item, index) => (
                <div className="reveal" key={item.title} style={stagger(index)}>
                  <article className="glass-card recognition-card">
                    <span className={`category-icon recognition-${index}`}>
                      <Icon name={item.icon} size={25} />
                    </span>
                    <span className="date-label">{item.date}</span>
                    <h3>{item.title}</h3>
                    <h4>{item.organization}</h4>
                    <p>{item.description}</p>
                  </article>
                </div>
              ))}
            </div>
            <div className="languages reveal">
              <h3>Languages</h3>
              <span>Arabic — Native</span>
              <span>English — C1</span>
              <span>German — A2</span>
              <span>Japanese — A2</span>
            </div>
          </div>
        </section>
        <section id="contact" className="section">
          <div className="container">
            <SectionHeading title="Get In Touch" />
            <div className="contact-layout">
              <div className="contact-copy reveal from-left">
                <h3>Let’s discuss your next opportunity!</h3>
                <p>
                  I’m interested in engineering opportunities involving full-stack applications,
                  backend systems, data engineering and software products. If my experience aligns
                  with your team, I’d be glad to connect.
                </p>
                <div className="contact-details">
                  <a href={`mailto:${contact.email}`}>
                    <span className="category-icon color-cyan">
                      <Icon name="mail" />
                    </span>
                    <span>
                      <small>EMAIL</small>
                      <strong>{contact.email}</strong>
                    </span>
                  </a>
                  <a href={contact.github} target="_blank" rel="noreferrer">
                    <span className="category-icon color-cyan">
                      <Icon name="github" />
                    </span>
                    <span>
                      <small>GITHUB</small>
                      <strong>Mohamed-Abdelaty</strong>
                    </span>
                  </a>
                  <div>
                    <span className="category-icon color-cyan">
                      <Icon name="pin" />
                    </span>
                    <span>
                      <small>LOCATION</small>
                      <strong>Egypt</strong>
                    </span>
                  </div>
                </div>
                <SocialLinks />
              </div>
              <div className="glass-card contact-panel reveal from-right">
                <span className="category-icon">
                  <Icon name="mail" size={25} />
                </span>
                <h3>Have an opportunity in mind?</h3>
                <p>
                  Share a quick introduction, what your team is building, and where my experience
                  could help.
                </p>
                <div className="contact-topics">
                  <span>Full-Stack Development</span>
                  <span>Data Engineering</span>
                  <span>Backend Systems</span>
                  <span>UI/UX Design</span>
                </div>
                <a className="button button-primary" href={`mailto:${contact.email}`}>
                  <Icon name="mail" size={18} />
                  Send an Email
                </a>
                <a
                  className="button button-secondary"
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  Connect on LinkedIn
                </a>
                <small>Prefer a quick introduction? Email or LinkedIn works.</small>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <a className="footer-brand" href="#home">
                Mohamed Elshaboury
              </a>
              <p>
                Full-Stack Developer, Big Data Engineer & UI/UX Designer.
                <br />
                Building useful systems with thoughtful experiences.
              </p>
            </div>
            <a className="back-top" href="#home">
              Back to Top
              <Icon name="arrowUp" size={15} />
            </a>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
        </div>
      </footer>
      {projectGallery && (
        <ProjectGallery onClose={() => setProjectGallery(false)} onSelect={setSelected} />
      )}
      {selected && (
        <ProjectDetail
          key={selected.slug}
          project={selected}
          onClose={() => setSelected(null)}
          onNext={() =>
            setSelected(
              projects[(projects.findIndex((p) => p.slug === selected.slug) + 1) % projects.length],
            )
          }
        />
      )}
      {trainingGallery && (
        <TrainingGallery onClose={() => setTrainingGallery(false)} onSelect={setCredential} />
      )}
      {credential && <TrainingDetail item={credential} onClose={() => setCredential(null)} />}
    </>
  );
}
