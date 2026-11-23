export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  role: string;
  challenge: string;
  solution: string;
  architecture: string[];
  features: string[];
  result: string;
  metric: string;
  metricLabel: string;
  repo: string;
  image: string;
  alt: string;
  note?: string;
}
export const projects: Project[] = [
  {
    slug: 'careflow',
    title: 'CareFlow IDS',
    category: 'DATA ENGINEERING / APPLIED ML',
    summary: 'From network traffic to actionable threat intelligence.',
    stack: ['Kafka', 'Spark', 'HDFS', 'FastAPI', 'Airflow'],
    role: 'End-to-end pipeline architecture, ingestion, model development, API and telemetry dashboard.',
    challenge:
      'High-volume flow ingestion, duplicate records and data leakage made reliable threat classification difficult.',
    solution:
      'Built watermark-bounded deduplication, removed leakage fields and added assertion guards. An Airflow compaction task consolidates small Parquet files before training and analytics.',
    architecture: [
      'Kafka ingestion',
      'Spark streaming + MLlib',
      'HDFS / PostgreSQL',
      'FastAPI + Streamlit',
    ],
    features: [
      '10-minute watermark deduplication',
      'Daily Parquet compaction and SQL rollups',
      'Asynchronous submissions and immediate heuristic scoring',
    ],
    result:
      'The supplied dossier reports 16,232,943 raw CSE-CIC-IDS2018 flows ingested, 5,660,346 validated flows retained, and a 99.94% GBT F1 score on a held-out set of 1,132,903 flows. These are dataset evaluation results, not production guarantees.',
    metric: '16.2M',
    metricLabel: 'network flows ingested',
    repo: 'https://github.com/Mohamed-Abdelaty/CareFlow-CIC-IDS',
    image: 'careflow',
    alt: 'CareFlow IDS supplied dashboard screenshot',
    note: 'Immediate heuristic scoring is separate from the 30-second streaming micro-batch pipeline. The supplied dashboard shows a different cleaned-flow snapshot (5.21M) from the 5.66M evaluation described in the dossier.',
  },
  {
    slug: 'events',
    title: 'Elshaboury Events',
    category: 'FULL-STACK / APPLIED AI',
    summary: 'One connected system for the entire event lifecycle.',
    stack: ['Node.js', 'Express', 'MySQL', 'Socket.IO', 'Scikit-learn'],
    role: 'REST APIs, relational schema, venue escrow workflows, workshop access control, frontend and Python ML integration.',
    challenge:
      'Venue contracts, ticketing, team coordination and attendance planning were disconnected workflows.',
    solution:
      'Connected venue booking and transactional wallet states with role-scoped authentication, QR check-in, real-time chat and a separate Flask inference service.',
    architecture: [
      'Modular JavaScript UI',
      'Express + Socket.IO',
      'MySQL ledger',
      'Flask + Scikit-learn',
    ],
    features: [
      'Venue contracting with dual approvals',
      'Multi-tier tickets and QR check-in',
      'Scoped workshop workspaces and attendance forecasting',
    ],
    result:
      'The dossier documents 234 REST endpoints across 28 route modules, 52 relational tables and 53 frontend interfaces. Seed accounts and sample transactions are simulated data.',
    metric: '234',
    metricLabel: 'documented REST endpoints',
    repo: 'https://github.com/Mohamed-Abdelaty/AI-Event-Management-Platform',
    image: 'events',
    alt: 'Elshaboury Events supplied application screenshot',
    note: 'The supplied documentation describes both a 65-feature assembly path and a 12-primary-feature model bundle; no model accuracy claim is presented.',
  },
  {
    slug: 'timetable',
    title: 'CSIT Timetable Engine',
    category: 'ALGORITHMS / WEB ENGINEERING',
    summary: 'Turning complex academic constraints into usable schedules.',
    stack: ['Python', 'Flask', 'SQLite', 'JavaScript', 'CSP'],
    role: 'CSP solver, CSV ingestion, SQLite schema, Flask service, schedule interface and browser-side PDF exports.',
    challenge:
      'Assigning courses, instructors and rooms creates a large combinatorial search space with competing schedule-quality goals.',
    solution:
      'Combined MRV variable ordering, backtracking and forward checking with soft scoring for compact schedules. Decomposed solving by cohort and added verification routines.',
    architecture: ['CSV ingestion', 'SQLite resources', 'Python CSP solver', 'Flask + browser PDF'],
    features: [
      'Qualification-based domain filtering',
      'Faculty search and cohort views',
      'Section, faculty and institutional PDF exports',
    ],
    result:
      'The supplied run reports 433 sessions and 302 CSP variables across four cohorts in 1.47 seconds, with zero intra-cohort hard conflicts. Cross-cohort resource freedom is not established by this result.',
    metric: '1.47s',
    metricLabel: 'documented solver run',
    repo: 'https://github.com/Mohamed-Abdelaty/AI-EJUST-Timetable-Creator',
    image: 'timetable',
    alt: 'CSIT Timetable Engine supplied scheduling interface',
  },
  {
    slug: 'rental',
    title: 'CarAgencies',
    category: 'BACKEND / FULL-STACK .NET',
    summary: 'Fleet operations with a dependable rental lifecycle.',
    stack: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'Docker'],
    role: 'Relational modeling, Identity authentication, rental lifecycle, Razor interfaces and container configuration.',
    challenge:
      'Manual pricing, inconsistent vehicle states and shared records required reliable server-side rules and ownership checks.',
    solution:
      'Validated dates and availability server-side, synchronized rental and return state, and guarded mutations with creator ownership. SQL Server health checks coordinate container startup.',
    architecture: [
      'Razor MVC interface',
      'ASP.NET Core + Identity',
      'EF Core + SQL Server',
      'Docker Compose',
    ],
    features: [
      'Server-side daily-rate calculations',
      'Resource-level editing permissions',
      'Availability filters and linked rental histories',
    ],
    result:
      'The dossier documents 11 relational tables, 30 controller action routes, 21 Razor views and a two-service container stack. Seeded rental amounts are test data, not commercial revenue.',
    metric: '21',
    metricLabel: 'Razor views implemented',
    repo: 'https://github.com/Mohamed-Abdelaty/Car-Agencies-Rental',
    image: 'rental',
    alt: 'CarAgencies supplied rental management screenshot',
  },
];
export const contact = {
  email: 'mohamed.320230191@ejust.edu.eg',
  github: 'https://github.com/Mohamed-Abdelaty',
  linkedin: 'https://www.linkedin.com/in/mohamed-elshaboury-87a093303/',
};
export const expertise = [
  [
    'Full-stack & frontend',
    'Responsive interfaces and complete web applications, built with interaction quality and maintainability in mind.',
    'React · TypeScript · JavaScript · HTML · CSS · Figma',
  ],
  [
    'Backend & APIs',
    'Application logic, secure APIs, relational services and real-time features.',
    'Node.js · Express · Python · FastAPI · C# · ASP.NET Core · Laravel',
  ],
  [
    'Data engineering',
    'Batch and streaming pipelines, distributed processing, orchestration and observability.',
    'Kafka · Spark · HDFS · Airflow · Parquet · PostgreSQL',
  ],
  [
    'Applied machine learning',
    'Data preparation, feature engineering, classification and constraint-driven optimization.',
    'Scikit-learn · XGBoost · Spark MLlib · Pandas · NumPy · CSP',
  ],
  [
    'Infrastructure & delivery',
    'Relational modeling, containerized development and system health monitoring.',
    'SQL Server · MySQL · Docker · Git · Linux · Prometheus · Grafana',
  ],
  [
    'Mobile & visual design',
    'Native Android applications, interactive prototypes and clear visual communication.',
    'Kotlin · Android · Figma · Wireframing · PowerPoint',
  ],
];
