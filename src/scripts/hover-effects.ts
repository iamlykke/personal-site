// Ховер-анимации, магнитные кнопки и перетаскиваемые чипы — только в informal.
import { isFun, loadGsap, onModeChange } from './informal';

type Effect = { enter: () => void; leave?: () => void };

let ready: Promise<Map<Element, Effect>> | null = null;

async function init() {
  const { gsap, SplitText, Draggable } = await loadGsap();

  const q = (selector: string) => document.querySelector(selector)!;
  const qa = (selector: string) => document.querySelectorAll(selector);
  const effects = new Map<Element, Effect>();

  // фото чуть приближается
  const portrait = q('.portrait-informal');
  effects.set(q('.photo'), {
    enter: () => gsap.to(portrait, { scale: 1.06, rotate: -1, duration: 0.6, ease: 'power3.out' }),
    leave: () => gsap.to(portrait, { scale: 1, rotate: 0, duration: 0.6, ease: 'power3.out' }),
  });

  // скриншот приподнимается
  const shot = q('.work .shot');
  effects.set(q('.work'), {
    enter: () => gsap.to(shot, { y: -8, rotate: -1.5, duration: 0.5, ease: 'back.out(2)' }),
    leave: () => gsap.to(shot, { y: 0, rotate: 0, duration: 0.4, ease: 'power2.out' }),
  });

  // буквы заголовка пробегают волной
  const chars = SplitText.create(q('.approach h2'), { type: 'chars' }).chars;
  effects.set(q('.approach'), {
    enter: () =>
      gsap.fromTo(chars, { y: 0 }, { y: -10, duration: 0.25, stagger: 0.03, yoyo: true, repeat: 1, ease: 'power2.out' }),
  });

  // слова разъезжаются и держатся, пока курсор на плитке; потом пружинят обратно
  const words = SplitText.create(q('.about h1'), { type: 'words' }).words;
  effects.set(q('.about'), {
    enter: () =>
      gsap.to(words, {
        rotate: () => gsap.utils.random(-7, 7),
        y: () => gsap.utils.random(-5, 5),
        duration: 0.4,
        stagger: 0.04,
        ease: 'back.out(3)',
      }),
    leave: () => gsap.to(words, { rotate: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }),
  });

  // чипы раскидываются как наклейки (цвета — в StackTile.astro)
  const stackTile = q('.stack');
  const chips = [...document.querySelectorAll<HTMLElement>('.stack .chips li')];
  // чип, который сейчас тащат: ховер-анимации его не трогают, иначе спорят с Draggable за x/y
  let dragged: HTMLElement | null = null;
  const freeChips = () => chips.filter((chip) => chip !== dragged);

  const scatter = () =>
    gsap.to(freeChips(), {
      rotate: () => gsap.utils.random(-6, 6),
      x: () => gsap.utils.random(-2, 2),
      y: () => gsap.utils.random(-3, 3),
      scale: 1.03,
      duration: 0.45,
      stagger: { each: 0.03, from: 'random' },
      ease: 'back.out(3)',
    });
  const settle = (targets: HTMLElement[]) =>
    gsap.to(targets, { rotate: 0, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' });

  effects.set(stackTile, {
    enter: scatter,
    leave: () => settle(freeChips()),
  });

  // чипы можно таскать, отпущенный пружинит на место
  const draggables = Draggable.create(chips, {
    bounds: stackTile,
    cursor: 'inherit',
    activeCursor: 'inherit',
    onPress() {
      dragged = this.target;
      gsap.killTweensOf(this.target);
    },
    onRelease() {
      dragged = null;
      gsap.to(this.target, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
      // курсор отпустили уже за плиткой — возвращаем наклон и масштаб
      if (!stackTile.matches(':hover')) gsap.to(this.target, { rotate: 0, scale: 1, duration: 0.6 });
    },
  });
  const syncDrag = () => draggables.forEach((d) => (isFun() ? d.enable() : d.disable()));
  syncDrag();
  onModeChange(syncDrag);

  // стрелки и крестики тянутся к курсору
  function magnet(el: HTMLElement, area: HTMLElement) {
    const toX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const toY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    area.addEventListener('pointermove', (e) => {
      if (!isFun()) return;
      const r = el.getBoundingClientRect();
      // центр без учёта текущего смещения, иначе кнопка «убегает»
      const dx = e.clientX - (r.left + r.width / 2 - Number(gsap.getProperty(el, 'x')));
      const dy = e.clientY - (r.top + r.height / 2 - Number(gsap.getProperty(el, 'y')));
      const near = Math.hypot(dx, dy) < 110;
      toX(near ? gsap.utils.clamp(-14, 14, dx * 0.35) : 0);
      toY(near ? gsap.utils.clamp(-14, 14, dy * 0.35) : 0);
    });

    area.addEventListener('pointerleave', () => {
      toX(0);
      toY(0);
    });
  }

  document.querySelectorAll<HTMLElement>('.tile .arrow').forEach((arrow) => magnet(arrow, arrow.closest('.tile')!));
  document.querySelectorAll<HTMLElement>('dialog .close').forEach((btn) => magnet(btn, btn.closest('dialog')!));

  return effects;
}

document.querySelectorAll('.tile').forEach((tile) => {
  tile.addEventListener('pointerenter', async () => {
    if (!isFun()) return;
    ready ??= init();
    (await ready).get(tile)?.enter();
  });

  tile.addEventListener('pointerleave', async () => {
    if (!ready) return;
    (await ready).get(tile)?.leave?.();
  });
});

// грузим GSAP заранее, как только включили informal
function preload() {
  if (isFun()) ready ??= init();
}

preload();
onModeChange(preload);
