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
