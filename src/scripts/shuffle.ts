// Пасхалка: ↓ ↓ ↑ ↓ в informal перемешивает плитки.
import { isInformal, loadGsap, reduced } from './informal';

const CODE = ['ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowDown'];
let pressed: string[] = [];

window.addEventListener('keydown', (e) => {
  pressed = [...pressed, e.key].slice(-CODE.length);
  if (pressed.join() !== CODE.join()) return;

  pressed = [];
  if (isInformal() && !document.querySelector('dialog[open]')) shuffle();
});

async function shuffle() {
  const { gsap } = await loadGsap();
  const grid = document.querySelector<HTMLElement>('.grid')!;
  const tiles = [...grid.querySelectorAll<HTMLElement>(':scope > .tile')];

  // FLIP: запоминаем где были, переставляем в DOM, анимируем со старых мест
  const before = new Map(tiles.map((tile) => [tile, tile.getBoundingClientRect()]));

  let order: HTMLElement[];
  do {
    order = gsap.utils.shuffle([...tiles]);
  } while (order.every((tile, i) => tile === tiles[i]));

  order.forEach((tile) => grid.append(tile));

  order.forEach((tile, i) => {
    const from = before.get(tile)!;
    const to = tile.getBoundingClientRect();
    gsap.fromTo(
      tile,
      { x: from.left - to.left, y: from.top - to.top, rotate: gsap.utils.random(-8, 8), zIndex: 5 },
      {
        x: 0,
        y: 0,
        rotate: 0,
        duration: reduced.matches ? 0 : 0.9,
        delay: i * 0.05,
        ease: 'power3.inOut',
        clearProps: 'transform,zIndex',
      },
    );
  });
}
