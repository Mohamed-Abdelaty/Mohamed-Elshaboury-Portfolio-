export interface ProjectStory {
  hook: string;
  invitation: string;
  focus: string;
  accent: string;
  architectureNotes: string[];
}
export const projectStories: Record<string, ProjectStory> = {
  careflow: {
    hook: 'Finding signal in 16.2 million flows.',
    invitation:
      'A noisy dataset. A distributed pipeline. A careful investigation into what the model was really learning.',
    focus: 'Streaming architecture · Data quality · Leakage investigation',
    accent: 'sage',
    architectureNotes: [
      'The ingestion producer normalizes headers and schemas before publishing network flows to Kafka.',
      'Spark validates numerical fields, applies a 10-minute watermark and deduplicates flow IDs before classification.',
      'Partitioned Parquet in HDFS supports batch analytics. PostgreSQL stores operational results and submission tracking.',
      'FastAPI exposes asynchronous submissions and separate immediate heuristic scoring; Streamlit visualizes telemetry.',
    ],
  },
  events: {
    hook: 'The whole event. One connected system.',
    invitation:
      'Bookings, ticketing, payments and people. The interesting part is making their lifecycles agree.',
    focus: 'Transactional workflows · Access boundaries · ML integration',
    accent: 'apricot',
    architectureNotes: [
      'Responsive HTML interfaces and modular JavaScript controllers serve attendees, hosts, venue owners and administrators.',
      'Express handles domain workflows and isolated authentication realms. Socket.IO supports live communication.',
      'MySQL transactions coordinate venue escrow, wallet states, cancellation refunds and booking records.',
      'A separate Flask service runs Scikit-learn model inference for event decisions and attendance forecasting.',
    ],
  },
  timetable: {
    hook: '433 sessions. A problem of constraints.',
    invitation:
      'Courses, rooms and instructors compete for the same slots. A constraint engine turns that search space into schedules.',
    focus: 'Constraint solving · Search heuristics · Schedule verification',
    accent: 'lilac',
    architectureNotes: [
      'CSV ingestion normalizes academic resource datasets before timetable generation.',
      'SQLite organizes instructors, courses, rooms, time slots, sections and generated schedules in six tables.',
      'The Python solver combines MRV ordering, backtracking and forward checking with schedule-quality soft scoring.',
      'Flask delivers cohort and faculty views. Browser-side PDF export supports sections, faculty and institutional schedules.',
    ],
  },
  rental: {
    hook: 'A rental is more than a booking.',
    invitation:
      'Pricing, ownership and availability all change together. Reliable operations start with getting those transitions right.',
    focus: 'Rental lifecycle · Resource ownership · Relational integrity',
    accent: 'blue',
    architectureNotes: [
      'Razor MVC views present fleet, customer, agency and rental workflows with dedicated view models.',
      'ASP.NET Core Identity handles authentication. Creator ownership checks guard mutations and returns.',
      'Entity Framework Core maps SQL Server relationships, unique plates and deletion restrictions around rentals.',
      'Docker Compose waits for a SQL Server health check before starting the web application.',
    ],
  },
};
