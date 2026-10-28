/**
 * 手账本翻页引擎
 *
 * 结构：每个 .leaf 是一张纸，正反两面；绕左边书脊旋转 -180°。
 * 翻过的纸留在左侧叠成扇形，当前页就是第一张没翻的纸。
 */

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function startTimers() {
  const timers = Array.from(document.querySelectorAll<HTMLElement>('[data-timer-date]'));
  if (!timers.length) return;

  const tick = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (const el of timers) {
      const raw = el.dataset.timerDate || '';
      const [y, m, d] = raw.split('-').map(Number);
      if (!y || !m || !d) continue;
      const start = new Date(y, m - 1, d);
      let years = today.getFullYear() - start.getFullYear();
      let anchor = new Date(start.getFullYear() + years, start.getMonth(), start.getDate());
      if (anchor.getTime() > now.getTime()) {
        years -= 1;
        anchor = new Date(start.getFullYear() + years, start.getMonth(), start.getDate());
      }
      const ms = Math.max(0, now.getTime() - anchor.getTime());
      el.querySelector('[data-timer-y]')!.textContent = String(Math.max(0, years));
      el.querySelector('[data-timer-d]')!.textContent = String(Math.floor(ms / 864e5));
      el.querySelector('[data-timer-h]')!.textContent = pad2(Math.floor((ms % 864e5) / 36e5));
      el.querySelector('[data-timer-m]')!.textContent = pad2(Math.floor((ms % 36e5) / 6e4));
      el.querySelector('[data-timer-s]')!.textContent = pad2(Math.floor((ms % 6e4) / 1e3));
    }
  };

  tick();
  window.setInterval(tick, 1000);
}

function initRotateHint() {
  const hint = document.querySelector<HTMLElement>('[data-rotate-hint]');
  if (!hint) return;
  const dismiss = hint.querySelector<HTMLElement>('[data-rotate-dismiss]');
  dismiss?.addEventListener('click', () => {
    hint.classList.add('is-dismissed');
  });
}

export function initBook() {
  const stage = document.querySelector<HTMLElement>('[data-book-stage]');
  const book = stage?.querySelector<HTMLElement>('[data-book]');
  if (!stage || !book) return;

  const leaves = Array.from(book.querySelectorAll<HTMLElement>('.leaf'));
  const total = leaves.length;
  if (!total) return;

  let current = 0;
  let locked = false;

  const counter = stage.querySelector<HTMLElement>('[data-book-current]');
  const prevBtn = stage.querySelector<HTMLButtonElement>('[data-book-prev]');
  const nextBtn = stage.querySelector<HTMLButtonElement>('[data-book-next]');

  const render = () => {
    leaves.forEach((leaf, i) => {
      const flipped = i < current;
      leaf.classList.toggle('is-flipped', flipped);
      leaf.style.zIndex = flipped ? String(10 + i) : String(100 + (total - i));
      leaf.style.setProperty('--turn', flipped ? '1' : '0');
    });
    if (counter) counter.textContent = String(Math.min(current + 1, total));
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= total - 1;
    stage.dataset.current = String(current);
    stage.dataset.progress = String(current / Math.max(1, total - 1));
  };

  const markTurning = (index: number) => {
    const leaf = leaves[index];
    if (!leaf) return;
    leaf.classList.add('is-turning');
    window.setTimeout(() => leaf.classList.remove('is-turning'), 900);
  };

  const next = () => {
    if (locked || current >= total - 1) return;
    locked = true;
    markTurning(current);
    current += 1;
    render();
    window.setTimeout(() => {
      locked = false;
    }, 620);
  };

  const prev = () => {
    if (locked || current <= 0) return;
    locked = true;
    current -= 1;
    markTurning(current);
    render();
    window.setTimeout(() => {
      locked = false;
    }, 620);
  };

  // 翻页阴影跟随动画
  leaves.forEach((leaf) => {
    leaf.addEventListener('transitionstart', () => leaf.classList.add('is-turning'));
    leaf.addEventListener('transitionend', () => leaf.classList.remove('is-turning'));
  });

  // 指针手势：滑动翻页 / 点击左右区域
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let tracking = false;

  const isInteractive = (target: EventTarget | null): boolean => {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest(
        'button, a, input, textarea, select, .book-hud, .timeline-track, .timeline-shell, [data-no-swipe]',
      ),
    );
  };

  stage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    if (isInteractive(event.target)) return;
    tracking = true;
    startX = event.clientX;
    startY = event.clientY;
    startTime = performance.now();
  });

  stage.addEventListener('pointerup', (event) => {
    if (!tracking) return;
    tracking = false;
    if (isInteractive(event.target)) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const elapsed = performance.now() - startTime;

    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) next();
      else prev();
      return;
    }
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12 && elapsed < 700) {
      const rect = book.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      if (ratio > 0.62) next();
      else if (ratio < 0.34) prev();
      else next();
    }
  });

  stage.addEventListener('pointercancel', () => {
    tracking = false;
  });

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      prev();
    } else if (event.key === 'Home') {
      current = 0;
      render();
    } else if (event.key === 'End') {
      current = total - 1;
      render();
    }
  });

  // 页内按钮：复用已有的分享卡 / 照片墙浮层
  document.querySelectorAll<HTMLElement>('[data-open-share]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector<HTMLElement>('.share-btn')?.click();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-open-gallery]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector<HTMLElement>('.photo-wall-entry')?.click();
    });
  });

  render();
  startTimers();
  initRotateHint();
}
