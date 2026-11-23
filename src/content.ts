export const experience = [
  {
    date: '2020 — Present',
    title: 'Full-Stack Developer',
    context: 'Freelance & independent projects',
    description:
      'Built eight React / Node web applications, three Laravel applications, two native Android apps and two browser-based games. Worked across requirements, interfaces, APIs, databases and working releases.',
    tags: ['Product development', 'End-to-end ownership'],
  },
  {
    date: '2026 — Present',
    title: 'Data Engineering',
    context: 'E-JUST · Academic engineering project',
    description:
      'Developing ChaosFlow, an academic pipeline platform combining Python, FastAPI, Kafka, Spark, HDFS and Airflow. Focused on configurable processing, observability and resilience evaluation.',
    tags: ['Distributed systems', 'Academic project'],
  },
  {
    date: '2022 — Present',
    title: 'UI/UX Designer',
    context: 'Freelance',
    description:
      'Designed wireframes, interactive prototypes and product interfaces in Figma, connecting design decisions with implementation.',
    tags: ['Interface design', 'Prototyping'],
  },
  {
    date: '2022 — Present',
    title: 'Presentation Designer',
    context: 'Freelance',
    description:
      'Created professional presentations for clients in Egypt and Japan, turning complex material into clear, audience-focused stories.',
    tags: ['Visual communication', 'Storytelling'],
  },
];
export const credentials = [
  {
    issuer: 'ITIDA / NTI',
    title: 'Big Data Analysis',
    detail: '120 hours',
    date: 'Aug–Sep 2026',
    result: '97% training score',
  },
  {
    issuer: 'Information Technology Institute',
    title: 'Web Development using .NET',
    detail: '144 hours',
    date: 'Jul–Aug 2026',
  },
  {
    issuer: 'Information Technology Institute',
    title: 'Android Development using Kotlin',
    detail: '120 hours',
    date: 'Jul–Aug 2025',
  },
  {
    issuer: 'Udemy · Dr. Angela Yu',
    title: 'Full-Stack Web Development Bootcamp',
    detail: '62 hours',
    date: 'February 2026',
  },
];

export const fullName = 'Mohamed Abdelaty Mohamed Elshaboury';
export const skillGroups = [
  {
    title: 'Full-Stack & Frontend',
    icon: 'code',
    tools: ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Figma'],
    description:
      'Responsive interfaces and complete web applications with attention to interaction quality and maintainable code.',
  },
  {
    title: 'Backend & APIs',
    icon: 'globe',
    tools: [
      'Node.js',
      'Express.js',
      'Python',
      'FastAPI',
      'Flask',
      'C#',
      'ASP.NET Core',
      'Entity Framework Core',
      'PHP',
      'Laravel',
      'REST APIs',
      'Swagger / OpenAPI',
      'Socket.IO',
    ],
    description: 'Application logic, secure APIs, database-backed services and real-time features.',
  },
  {
    title: 'Big Data Engineering',
    icon: 'database',
    tools: [
      'Kafka',
      'Spark',
      'Structured Streaming',
      'HDFS',
      'Airflow',
      'Parquet',
      'Docker Compose',
    ],
    description: 'Batch and streaming pipelines, distributed processing and orchestration.',
    note: 'Additional study: Apache Flink and Apache Hive.',
  },
  {
    title: 'Applied AI & Machine Learning',
    icon: 'brain',
    tools: [
      'Scikit-learn',
      'XGBoost',
      'CatBoost',
      'LightGBM',
      'Spark MLlib',
      'Pandas',
      'NumPy',
      'PyArrow',
      'Feature Engineering',
      'Constraint Satisfaction',
    ],
    description:
      'Practical prediction, classification, data preparation and algorithmic optimization.',
  },
  {
    title: 'Data & Infrastructure',
    icon: 'tools',
    tools: [
      'PostgreSQL',
      'MySQL',
      'SQL Server',
      'SQLite',
      'Docker',
      'Git',
      'Linux / Bash',
      'Prometheus',
      'Grafana',
    ],
    description: 'Relational modeling, containerized development and system health monitoring.',
  },
  {
    title: 'Mobile & UI/UX Design',
    icon: 'mobile',
    tools: [
      'Kotlin',
      'Android Development',
      'Figma',
      'Wireframing',
      'Interactive Prototyping',
      'UI Design',
      'PowerPoint',
    ],
    description: 'Native Android applications, clear product interfaces and visual communication.',
  },
] as const;
export interface Training {
  id: string;
  title: string;
  issuer: string;
  period: string;
  detail: string;
  description: string;
  result?: string;
  evidence: 'supplied' | 'cv';
}
export const training: Training[] = [
  {
    id: 'big-data',
    title: 'Big Data Analysis — Summer Training',
    issuer: 'ITIDA / National Telecommunication Institute',
    period: 'August 9 – September 3, 2026',
    detail: '120 hours',
    result: '97% training score',
    description:
      'Completed 90 technical hours and 30 freelancing hours in a structured Big Data Analysis program, achieving a final score of 97%.',
    evidence: 'supplied',
  },
  {
    id: 'dotnet',
    title: 'Web Development using .NET',
    issuer: 'Information Technology Institute (ITI)',
    period: 'July 1 – August 10, 2026',
    detail: '144 hours',
    description:
      'Training in SQL Server, C#, Entity Framework, ASP.NET MVC, generative AI, AI agents, workflow automation and freelancing fundamentals.',
    evidence: 'supplied',
  },
  {
    id: 'android',
    title: 'Android Application Development using Kotlin',
    issuer: 'Information Technology Institute (ITI)',
    period: 'July 8 – August 3, 2025',
    detail: '120 hours',
    description:
      'Completed 60 hours of Kotlin programming and 60 hours of native Android application development.',
    evidence: 'supplied',
  },
  {
    id: 'fullstack',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy · Dr. Angela Yu',
    period: 'February 11, 2026',
    detail: '62 hours',
    description:
      'Completed a comprehensive course introducing the end-to-end development of full-stack web applications.',
    evidence: 'supplied',
  },
  {
    id: 'depi',
    title: 'Full Stack .NET Web Developer',
    issuer: 'Digital Egypt Pioneers Program · MCIT',
    period: 'June – December 2025',
    detail: 'Professional training',
    description:
      'Studied full-stack .NET development as part of the Digital Egypt Pioneers Program. Listed in the supplied CV.',
    evidence: 'cv',
  },
  {
    id: 'powerpoint',
    title: 'Microsoft Office Specialist: PowerPoint 2019 Associate',
    issuer: 'Microsoft',
    period: 'March 2022',
    detail: 'Professional credential',
    description:
      'Earned a Microsoft Office Specialist credential in PowerPoint 2019. Listed in the supplied CV.',
    evidence: 'cv',
  },
  {
    id: 'business',
    title: 'Business Skills Training — Level 01',
    issuer: 'Microsoft / Tawar w Ghayer',
    period: 'February 2022',
    detail: 'Professional development',
    description:
      'Completed a professional development program focused on foundational business skills. Listed in the supplied CV.',
    evidence: 'cv',
  },
];
export const recognition = [
  {
    title: 'IT Vice Head',
    organization: 'TEDxYouth@Elmenya STEM',
    date: 'Community contribution',
    description:
      'Recognized for technical leadership and coordination at an independently organized TEDx youth event. This is community contribution, not employment by TED.',
    icon: 'screen',
  },
  {
    title: 'Galactic Problem-Solver',
    organization: 'NASA International Space Apps Challenge',
    date: 'October 2021',
    description:
      'Participation recognition for contributions during the international Space Apps hackathon. This is hackathon participation, not NASA employment or a winner claim.',
    icon: 'spark',
  },
  {
    title: 'Creative Award — The Secrets of the Sun',
    organization: 'ISEIC 2022',
    date: '2022 · Listed in supplied CV',
    description:
      'Recognized with the Creative Award at the International Scientific and Engineering Innovation Competition. A public award image is not included.',
    icon: 'award',
  },
] as const;
