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

/* Signature analytical interface. Pointer work is event-driven and frame-batched. */
(() => {
  const hero = document.querySelector('.hero');
  const workflow = document.querySelector('.workflow');
  if (!hero || !workflow) return;
  const svg = workflow.querySelector('svg');
  const controls = workflow.querySelector('.workflow-controls');
  const readout = workflow.querySelector('.workflow-readout');
  const buttons = [...controls.querySelectorAll('button')];
  const anchors = [...svg.querySelectorAll('.data-points circle')];
  const marks = [...svg.querySelectorAll('.field-points circle')].map(node => ({
    node, x: Number(node.getAttribute('cx')), y: Number(node.getAttribute('cy')),
  }));
  const guide = svg.querySelector('.inspection-guide');
  const descriptions = [
    'Collect — Bring relevant sources into one analytical view.',
    'Clean — Standardize records and validate data quality.',
    'Analyze — Compare patterns and prioritize meaningful changes.',
    'Communicate — Translate evidence into clear business decisions.',
  ];
  function selectStage(index) {
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    anchors.forEach((point, i) => point.classList.toggle('is-selected', i === index));
    guide.setAttribute('transform', `translate(${Number(anchors[index].getAttribute('cx')) - 58} 0)`);
    readout.textContent = descriptions[index];
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => selectStage(index)));
  controls.hidden = false;
  readout.hidden = false;
  selectStage(0);

  const pointerAllowed = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px) and (prefers-reduced-motion: no-preference)');
  let frame = 0;
  let latest = null;
  let heroBounds = null;
  let svgBounds = null;
  const reset = () => {
    if (!latest && !frame && !heroBounds) return;
    cancelAnimationFrame(frame);
    frame = 0;
    latest = null;
    heroBounds = svgBounds = null;
    hero.classList.remove('grid-inspecting');
    marks.forEach(({node}) => { node.removeAttribute('transform'); node.classList.remove('is-near'); });
  };
  function renderPointer() {
    frame = 0;
    if (!latest || !pointerAllowed.matches) return;
    // All geometry reads precede style writes, at most once per animation frame.
    if (!heroBounds) heroBounds = hero.getBoundingClientRect();
    if (!svgBounds) svgBounds = svg.getBoundingClientRect();
    const {x, y} = latest;
    const px = (x - svgBounds.left) * 560 / svgBounds.width;
    const py = (y - svgBounds.top) * 300 / svgBounds.height;
    hero.style.setProperty('--grid-x', `${x - heroBounds.left}px`);
    hero.style.setProperty('--grid-y', `${y - heroBounds.top}px`);
    hero.classList.add('grid-inspecting');
    marks.forEach(({node, x: mx, y: my}) => {
      const dx = px - mx, dy = py - my;
      const distance = Math.hypot(dx, dy);
      const weight = Math.max(0, 1 - distance / 95);
      const amount = 3 * weight;
      node.setAttribute('transform', `translate(${dx / Math.max(distance, 1) * amount} ${dy / Math.max(distance, 1) * amount})`);
      node.classList.toggle('is-near', distance < 65);
    });
  }
  hero.addEventListener('pointermove', event => {
    if (!pointerAllowed.matches || event.pointerType === 'touch') return;
    latest = { x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(renderPointer);
  }, {passive: true});
  hero.addEventListener('pointerleave', reset);
  pointerAllowed.addEventListener('change', reset);
  window.addEventListener('resize', reset, {passive: true});
  window.addEventListener('scroll', reset, {passive: true});
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });

  // Reading stages describe the portfolio journey, not measured analytical results.
  const journey = document.querySelector('.analysis-journey');
  if (journey && 'IntersectionObserver' in window) {
    const stages = [document.querySelector('#top'), document.querySelector('#experience'),
      document.querySelector('#projects'), document.querySelector('#contact')];
    const active = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => active.set(entry.target, entry.isIntersecting));
      const visible = stages.filter(section => active.get(section));
      if (!visible.length) return;
      const index = stages.indexOf(visible[visible.length - 1]);
      journey.querySelectorAll('[data-journey]').forEach((marker, i) => {
        if (i === index) marker.setAttribute('aria-current', 'step');
        else marker.removeAttribute('aria-current');
      });
    }, {rootMargin: '-10% 0px -35% 0px', threshold: 0});
    stages.forEach(section => observer.observe(section));
    journey.hidden = false;
  }
})();
