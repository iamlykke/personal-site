// Общее для всех «весёлых» эффектов неформального режима.

const root = document.documentElement;
const canHover = matchMedia('(hover: hover) and (pointer: fine)');
export const reduced = matchMedia('(prefers-reduced-motion: reduce)');

export const isInformal = () => root.dataset.mode === 'informal';
export const isFun = () => isInformal() && canHover.matches && !reduced.matches;

export function onModeChange(callback: () => void) {
  new MutationObserver(callback).observe(root, { attributes: true, attributeFilter: ['data-mode'] });
}

// GSAP и плагины — отдельным чанком, грузим один раз и только по требованию
let gsapPromise: ReturnType<typeof importGsap> | null = null;

async function importGsap() {
  const [{ gsap }, { SplitText }, { Draggable }] = await Promise.all([
    import('gsap'),
    import('gsap/SplitText'),
    import('gsap/Draggable'),
  ]);
  gsap.registerPlugin(SplitText, Draggable);
  gsap.defaults({ overwrite: 'auto' });
  return { gsap, SplitText, Draggable };
}

export function loadGsap() {
  gsapPromise ??= importGsap();
  return gsapPromise;
}
