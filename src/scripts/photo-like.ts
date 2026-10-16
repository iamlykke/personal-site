// Двойной клик / тап по фото в informal — лайк как в инстаграме.
import { isInformal } from './informal';
import { heart } from '../icons';

const COLORS = ['var(--pink)', 'var(--yellow)', 'var(--mint)', 'var(--accent)'];
const DOUBLE_TAP_MS = 300;

const photo = document.querySelector<HTMLElement>('.photo')!;
const badge = photo.querySelector<HTMLElement>('.likes')!;
const counter = badge.querySelector('span')!;

let likes = 0;
let lastTap = 0;

const svg = (className: string, style = '') =>
  `<svg class="${className}" viewBox="0 0 24 24" style="${style}"><path d="${heart}"></path></svg>`;

function like(x: number, y: number) {
  const rect = photo.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'like';
  el.style.left = `${x - rect.left}px`;
  el.style.top = `${y - rect.top}px`;

  // большое белое сердце + маленькие цветные разлетаются по кругу
  let html = svg('like-big');
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 70 + Math.random() * 40;
    const rotate = Math.round(Math.random() * 60 - 30);
    html += svg(
      'like-mini',
      `--c: ${COLORS[i % COLORS.length]}; --x: ${Math.cos(angle) * dist}px; --y: ${Math.sin(angle) * dist}px; --r: ${rotate}deg`,
    );
  }
  el.innerHTML = html;
  photo.append(el);
  setTimeout(() => el.remove(), 1100);

  likes++;
  counter.textContent = String(likes);
  badge.classList.add('is-visible');
  // перезапускаем анимацию «подпрыгивания» счётчика
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

photo.addEventListener('pointerup', (e) => {
  if (!isInformal() || (e.target instanceof Element && e.target.closest('.toggle, .hire'))) return;

  if (e.timeStamp - lastTap < DOUBLE_TAP_MS) {
    like(e.clientX, e.clientY);
    lastTap = 0;
  } else {
    lastTap = e.timeStamp;
  }
});
