// Клик по Email копирует адрес и показывает «Copied!» над курсором.
// На Windows mailto: часто никуда не ведёт, так что копирование полезнее.

const SHOW_MS = 1200;

function showCopied(x: number, y: number) {
  const tip = document.createElement('div');
  tip.className = 'copied';
  tip.setAttribute('role', 'status');
  tip.textContent = 'Copied!';
  tip.style.left = `${x}px`;
  tip.style.top = `${y}px`;
  document.body.append(tip);
  setTimeout(() => tip.remove(), SHOW_MS);
}

document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((link) => {
  const email = link.href.replace('mailto:', '');

  link.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // буфер недоступен — открываем почтовый клиент как обычно
      location.href = link.href;
      return;
    }

    // с клавиатуры координат курсора нет — показываем над самой ссылкой
    if (e.detail === 0) {
      const rect = link.getBoundingClientRect();
      showCopied(rect.left + rect.width / 2, rect.top);
    } else {
      showCopied(e.clientX, e.clientY);
    }
  });
});
