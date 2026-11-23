import type { CSSProperties } from 'react';

export type IconName =
  | 'code'
  | 'layers'
  | 'database'
  | 'spark'
  | 'screen'
  | 'pen'
  | 'mail'
  | 'plus'
  | 'close'
  | 'menu'
  | 'expand'
  | 'minus'
  | 'book'
  | 'globe'
  | 'sun'
  | 'moon'
  | 'github'
  | 'chevronRight'
  | 'chevronDown'
  | 'arrowUp'
  | 'briefcase'
  | 'graduation'
  | 'award'
  | 'pin'
  | 'info'
  | 'mobile'
  | 'brain'
  | 'tools'
  | 'check';
const paths: Record<IconName, string[]> = {
  code: ['m8 7-5 5 5 5', 'm16 7 5 5-5 5', 'm14 4-4 16'],
  layers: ['m12 3 10 6-10 6L2 9Z', 'm2 13 10 6 10-6', 'm2 17 10 6 10-6'],
  database: [
    'M20 6c0 2.2-3.6 4-8 4S4 8.2 4 6s3.6-4 8-4 8 1.8 8 4Z',
    'M4 6v12c0 2.2 3.6 4 8 4s8-1.8 8-4V6',
    'M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4',
  ],
  spark: ['m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6Z'],
  screen: ['M3 4h18v13H3Z', 'M8 21h8', 'M12 17v4'],
  pen: ['m15 4 5 5', 'm3 21 5-1L21 7a2.1 2.1 0 0 0-4-4L4 16Z'],
  mail: ['M3 5h18v14H3Z', 'm3 6 9 7 9-7'],
  plus: ['M12 5v14', 'M5 12h14'],
  close: ['m6 6 12 12', 'M6 18 18 6'],
  menu: ['M4 8h16', 'M4 16h16'],
  expand: ['M8 3H3v5', 'M16 3h5v5', 'M3 16v5h5', 'M21 16v5h-5'],
  minus: ['M5 12h14'],
  book: ['M12 6c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V5c-3-1-7-1-10 1Z', 'M12 6v15'],
  globe: [
    'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    'M3 12h18',
    'M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',
  ],
  check: ['m5 12 4 4L19 6'],
  sun: [
    'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    'M12 2v2',
    'M12 20v2',
    'M2 12h2',
    'M20 12h2',
    'm5 5 1.5 1.5',
    'm17.5 17.5 1.5 1.5',
    'm5 19 1.5-1.5',
    'm17.5 6.5 1.5-1.5',
  ],
  moon: ['M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z'],
  github: [
    'M9 19c-4.3 1.3-4.3-2.2-6-2.7',
    'M15 22v-3.5c0-1 .1-1.4-.5-2 3.1-.3 6.5-1.5 6.5-7A5.5 5.5 0 0 0 19.5 6c.2-.8.2-2.2-.4-3.5 0 0-1.2-.4-4.1 1.5a14 14 0 0 0-7 0C5.1 2.1 3.9 2.5 3.9 2.5 3.3 3.8 3.3 5.2 3.5 6A5.5 5.5 0 0 0 2 9.5c0 5.5 3.4 6.7 6.5 7-.6.6-.6 1.2-.5 2V22',
  ],
  chevronRight: ['m9 6 6 6-6 6'],
  chevronDown: ['m6 9 6 6 6-6'],
  arrowUp: ['M12 20V4', 'm6 10 6-6 6 6'],
  briefcase: ['M3 7h18v14H3Z', 'M8 7V3h8v4', 'M3 12c5 3 13 3 18 0', 'M10 13h4'],
  graduation: ['m2 9 10-6 10 6-10 6Z', 'M6 12v6c3 3 9 3 12 0v-6', 'M22 9v8'],
  award: ['M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z', 'm7 11-2 11 7-4 7 4-2-11'],
  pin: ['M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z', 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'],
  info: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', 'M12 11v6', 'M12 7h.01'],
  mobile: ['M6 2h12v20H6Z', 'M11 18h2'],
  brain: [
    'M12 5c-3-5-8-2-7 2-4 1-4 7-1 8-1 5 6 7 8 2 2 5 9 3 8-2 3-1 3-7-1-8 1-4-4-7-7-2Z',
    'M12 5v12',
    'M7 8v3',
    'M17 8v3',
  ],
  tools: ['m14 6 4 4', 'M21 3l-4 1-3 5 1 3-9 9-3-3 9-9-3-1-5 3-1 4', 'm15 15 6 6', 'm18 14 3 3'],
};
export function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
