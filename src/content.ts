import type { ImageMetadata } from 'astro';
import space307 from './assets/projects/space307.png';
import space307Poster from './assets/projects/space307-poster.jpg';
import place01Poster from './assets/projects/place01-poster.jpg';
import concertsArchive from './assets/projects/concerts-archive.png';
import photoKotor from './assets/photos/kotor.jpg';
import photoBench from './assets/photos/novi-sad-bench.jpg';
import photoFortress from './assets/photos/novi-sad-fortress.jpg';
import photoSunset from './assets/photos/sunset.jpg';
import photoGenex from './assets/photos/belgrade-genex.jpg';

export const site = {
  name: 'Sergei Usachev',
  title: 'Sergei Usachev — Frontend Engineer',
  description:
    'Frontend engineer based in Serbia. 5.5+ years building websites and web apps with React, Next.js and TypeScript.',
  jobTitle: 'Frontend Engineer',
  country: 'Serbia',
};

export const links = [
  { label: 'GitHub', href: 'https://github.com/iamlykke' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sergeiusachev/' },
  { label: 'Telegram', href: 'https://t.me/iamlykke' },
  { label: 'Email', href: 'mailto:usachev97@gmail.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/sergeiusachev/' },
  { label: 'Resume', href: '/sergei-usachev-cv.pdf' },
] as const;

export const stackGroups = [
  { title: 'Core', items: ['React', 'TypeScript', 'Next.js', 'Astro'] },
  { title: 'State & data', items: ['Zustand', 'MobX', 'React Query'] },
  { title: 'Tooling', items: ['Vite', 'Node.js', 'Jest', 'Figma'] },
  { title: 'Styling', items: ['Tailwind'] },
] as const;

export const stack = stackGroups.flatMap((group) => group.items);

export const principles = [
  {
    title: 'Readable over clever',
    text: 'Someone will read this code after me, often me a year later. Clear names and small components help them more than smart tricks.',
  },
  {
    title: 'Typed end to end',
    text: 'TypeScript from the API layer to the UI, so the compiler catches most of what a refactor breaks.',
  },
  {
    title: 'State where it belongs',
    text: 'Server state in React Query, UI state next to the component that uses it, a global store only when it pays off.',
  },
  {
    title: 'Fast from day one',
    text: 'I set a performance budget and watch Core Web Vitals from the first commit. Speeding a site up the week before release is always harder.',
  },
] as const;

export const about = {
  intro: [
    'I’m a frontend developer with 5.5+ years of commercial experience in React, Next.js and TypeScript. I’ve started projects from an empty repo and taken over old codebases that needed cleaning up, and I like both.',
    'What I pay attention to: pages that load fast, animations that don’t stutter, forms that work from the keyboard and layouts that don’t break on a small phone.',
  ],
  status: 'Open to new opportunities',
  facts: [
    { label: 'Based in', value: 'Serbia', flag: 'rs' },
    { label: 'Experience', value: '5.5+ years' },
    { label: 'Languages', value: 'EN · RU' },
    { label: 'Education', value: 'Engineering' },
  ],
  experience: [
    {
      years: '2022 — 2026',
      company: 'Space307',
      role: 'Frontend Developer',
      text: 'Built an internal HR system from scratch, led the page-by-page migration from Symfony to React and turned an internal CRM into a template adopted by 7 teams.',
    },
    {
      years: '2021 — 2022',
      company: 'Greenatom',
      role: 'Frontend Developer',
      text: 'Worked on a self-service HR portal used daily by 50,000+ employees: org chart with search, real-time modules on RxJS, simpler request forms.',
    },
  ],
  // icon — ключ иконки из src/icons.ts; тег может быть ссылкой
  hobbies: [
    {
      title: 'Music',
      icon: 'music',
      tags: ['Listening', 'Guitar', 'Drums', { label: 'Concerts', href: 'https://my-blog-blond-omega.vercel.app/' }],
    },
    { title: 'Photography', icon: 'camera', tags: ['Fujifilm X-T30', 'Phone'] },
    { title: 'Travel', icon: 'plane', tags: ['New cities', 'Concert trips'] },
    { title: 'Sport', icon: 'trophy', tags: ['Tennis', 'Padel', 'Football', 'Formula 1'] },
  ],
  // свои снимки — лента под хобби; place — подпись
  photos: [
    { src: photoKotor, place: 'Kotor', alt: 'Bay of Kotor at dusk, seen from the hills above the old town' },
    { src: photoBench, place: 'Novi Sad', alt: 'A woman on a bench next to a street lamp, city skyline at sunset' },
    { src: photoFortress, place: 'Novi Sad', alt: 'View from Petrovaradin Fortress over the Danube in golden light' },
    { src: photoSunset, place: 'Novi Sad', alt: 'Two silhouettes watching the sun set over the city' },
    { src: photoGenex, place: 'Belgrade', alt: 'Genex Tower framed by trees' },
  ],
};

export type Project = {
  name: string;
  stack: string[];
  /** пара предложений под названием в раскрытом My Work */
  description: string;
  host?: string;
  /** без ссылки превью некликабельное */
  url?: string;
  image?: ImageMetadata;
  /** короткая запись экрана для превью (лежит в public/video); bg — цвет полей вокруг, под фон сайта */
  video?: { src: string; poster: ImageMetadata; bg: string };
};

export const projects: Project[] = [
  {
    name: 'Space307',
    description:
      'Website for Space307, the international fintech product company I worked at.\nAvailable in English and Greek.',
    stack: ['React', 'TypeScript', 'Vite', 'Motion', 'i18n'],
    host: 'space307.com',
    url: 'https://space307.com/',
    image: space307,
    video: { src: '/video/space307.mp4', poster: space307Poster, bg: '#000' },
  },
  {
    name: 'Place.01',
    description:
      'Company website for Place.01, a fintech development studio.',
    stack: ['React', 'TypeScript', 'Vite', 'Motion'],
    host: 'place01.ru',
    url: 'https://place01.ru/',
    video: { src: '/video/place01.mp4', poster: place01Poster, bg: '#e3e2e1' },
  },
  {
    name: 'Concerts Archive',
    description:
      'My log of every concert I’ve been to, with a map of everywhere I’ve seen live music.',
    stack: ['Next.js', 'React', 'TypeScript'],
    // домен не показываем — технический адрес Vercel
    url: 'https://my-blog-blond-omega.vercel.app/',
    image: concertsArchive,
  },
];

// превью на плитке My Work
export const featuredProject = projects[0];

export const copy = {
  work: 'Websites for Space307 and Place.01, plus a Next.js archive of every concert I’ve been to.',
  approach:
    'Simple code over clever code, TypeScript everywhere, state kept next to where it’s used and speed checked from the first commit.',
  about:
    'Based in Serbia. I’ve been building websites and web apps with React and TypeScript for 5.5+ years.',
  marquee: 'OPEN TO NEW OPPORTUNITIES',
};
