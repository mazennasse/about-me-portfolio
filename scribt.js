
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Nav background on scroll + progress bar ---------- */
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progressBar');

  function onScroll(){
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 30);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu(){
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow='';
  }

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('[data-nav-mobile]').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- Active nav link tracking ---------- */
  const sections = ['home','about','process','work','contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('[data-nav]');

  function setActiveLink(id){
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        setActiveLink(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window){
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting){
          // slight stagger for elements revealing together
          setTimeout(() => entry.target.classList.add('in-view'), i * 40);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Hero terminal typing effect ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroCode = document.querySelector('.hero-response .response-card-body code');

  if (heroCode && !prefersReducedMotion){
    const fullHTML = heroCode.innerHTML;
    heroCode.innerHTML = '';
    heroCode.style.opacity = '1';

    // Reveal the JSON response with a quick fade rather than a slow
    // character-by-character type (keeps it feeling snappy, not gimmicky).
    const heroObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          let opacity = 0;
          heroCode.innerHTML = fullHTML;
          heroCode.style.transition = 'opacity 0.6s ease';
          requestAnimationFrame(() => { heroCode.style.opacity = '1'; });
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });

    heroCode.style.opacity = '0';
    heroObserver.observe(heroCode);
  }

  /* ---------- Smooth-scroll offset fix for fixed nav on anchor clicks ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1){
        const target = document.querySelector(targetId);
        if (target){
          e.preventDefault();
          const navHeight = nav.offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          history.pushState(null, '', targetId);
        }
      }
    });
  });

});
