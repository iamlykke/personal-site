export const site = {
  name: 'Sergei Usachev',
  title: 'Sergei Usachev — Frontend Engineer',
  description:
    'Frontend engineer based in Serbia. I build fast, accessible interfaces with React and TypeScript — from landing pages to product apps.',
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
  { title: 'Core', items: ['React', 'TypeScript', 'Next.js'] },
  { title: 'State & data', items: ['Zustand', 'React Query'] },
  { title: 'Tooling', items: ['Vite', 'Jest'] },
  { title: 'Styling', items: ['Tailwind'] },
] as const;

export const stack = stackGroups.flatMap((group) => group.items);

export const principles = [
  {
    title: 'Readable over clever',
    text: 'Code is read far more often than it is written. Clear names and small components beat smart tricks.',
  },
  {
    title: 'Typed end to end',
    text: 'TypeScript from the API layer to the UI, so refactoring stays boring and safe.',
  },
  {
    title: 'State where it belongs',
    text: 'Server state in React Query, UI state next to the component that uses it, a global store only when it pays off.',
  },
  {
    title: 'Performance is a feature',
    text: 'Budgets, lazy loading and Core Web Vitals are checked from the first commit — not patched before release.',
  },
] as const;

// TODO: дописать про себя подробнее
export const about = {
  more: [
    'I care about the details people feel but rarely notice: a fast first paint, smooth interactions, keyboard support and layouts that hold up on any screen.',
    'Lately I have been shipping landing pages and product interfaces with React, TypeScript and Vite — and built this site with Astro.',
  ],
  facts: [
    { label: 'Based in', value: 'Serbia' },
    { label: 'Focus', value: 'React · TypeScript' },
    { label: 'Status', value: 'Open for new opportunities' },
  ],
} as const;

export const projects = [
  { name: 'Personal site', stack: 'Astro · TypeScript', host: 'you are here', url: '/' },
  { name: 'Space307', stack: 'React · Vite', host: 'space307.com', url: 'https://space307.com/' },
  { name: 'Place01', stack: 'React · Vite', host: 'place01.ru', url: 'https://place01.ru/' },
] as const;

export const copy = {
  work: 'Three production builds — an Astro personal site and two React + Vite landings.',
  approach:
    'Readable over clever. Typed end to end, state kept where it belongs, and performance treated as a feature — not a phase.',
  about:
    'Based in Serbia. I build fast, accessible interfaces with React and TypeScript — from landing pages to product apps.',
  marquee: 'OPEN FOR NEW OPPORTUNITIES',
};
