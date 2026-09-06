/* Progressive enhancements only: all content and links live in index.html. */
(() => {
  const navigation = document.querySelector('.navigation');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('#nav-links');
  if (navigation && toggle && links) {
    const close = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', (event) => {
      if (event.target.closest('a')) close();
    });
    navigation.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && links.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });
    const mobile = window.matchMedia('(max-width: 760px)');
    const sync = () => {
      const focused = document.activeElement;
      if (mobile.matches && links.contains(focused)) toggle.focus();
      if (!mobile.matches && focused === toggle) links.querySelector('a').focus();
      toggle.hidden = !mobile.matches;
      close();
    };
    navigation.classList.add('enhanced');
    sync();
    mobile.addEventListener('change', sync);
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

/* Real values remain in HTML; enhancements run once and never gate content. */
(() => {
  if (!('IntersectionObserver' in window)) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  const finishAll = () => {
    for (const finish of [...running]) finish();
  };
  reduced.addEventListener('change', () => {
    if (reduced.matches) finishAll();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) finishAll();
  });

  function revealMetric(element) {
    const finalText = element.textContent;
    const value = Number.parseInt(finalText, 10);
    if (!Number.isFinite(value)) return;
    const suffix = finalText.replace(/^\d+/, '');
    // Reserve the final width; assistive technology reads only the final value.
    element.style.minWidth = `${element.getBoundingClientRect().width}px`;
    element.classList.add('metric-value');
    const accessible = document.createElement('span');
    accessible.className = 'visually-hidden';
    accessible.textContent = finalText;
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    visual.textContent = finalText;
    element.replaceChildren(accessible, visual);
    let frame;
    let start;
    const finish = () => {
      cancelAnimationFrame(frame);
      element.textContent = finalText;
      element.style.removeProperty('min-width');
      element.classList.remove('metric-value');
      running.delete(finish);
    };
    running.add(finish);
    const tick = (now) => {
      if (start === undefined) start = now;
      const progress = Math.min((now - start) / 700, 1);
      visual.textContent = `${Math.round(value * (1 - (1 - progress) ** 3))}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
      else finish();
    };
    frame = requestAnimationFrame(tick);
  }

  function drawWorkflow(path) {
    if (!path.animate) return;
    const length = path.getTotalLength();
    const animation = path.animate([
      { strokeDasharray: `${length} ${length}`, strokeDashoffset: length },
      { strokeDasharray: `${length} ${length}`, strokeDashoffset: 0 },
    ], { duration: 900, easing: 'ease-out' });
    const finish = () => {
      animation.cancel();
      running.delete(finish);
    };
    running.add(finish);
    animation.onfinish = finish;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (reduced.matches || document.hidden) continue;
      if (entry.target.matches('.workflow')) {
        const path = entry.target.querySelector('.trend-line');
        if (path) drawWorkflow(path);
      } else {
        entry.target.querySelectorAll('.impact-item strong').forEach(revealMetric);
      }
    }
  }, { threshold: 0.25 });
  document.querySelectorAll('.workflow, .impact-band').forEach((element) => observer.observe(element));
})();
