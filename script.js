(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme toggle
  $('#theme').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Mobile menu
  var burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('a', menu).forEach(function (a) {
    a.addEventListener('click', function () { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); });
  });

  // Scroll progress, nav shadow, back-to-top
  var bar = $('#progress'), nav = $('#nav'), topBtn = $('#top-btn');
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    nav.classList.toggle('scrolled', scrollY > 30);
    topBtn.classList.toggle('show', scrollY > 600);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  topBtn.addEventListener('click', function () { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  // Reveal on scroll + count-up
  function countUp(el) {
    var target = +el.dataset.count, dec = +(el.dataset.dec || 0), start = performance.now();
    if (reduce) { el.textContent = target.toFixed(dec); return; }
    (function step(now) {
      var p = Math.min((now - start) / 1400, 1);
      el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  // Hero spotlight follows pointer
  var hero = $('.hero'), cross = $('#crosshair');
  if (!reduce && matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      cross.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      cross.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      $$('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  // Active nav link
  var links = $$('#menu a');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(function (s) { spy.observe(s); });

  // Typing effect
  var words = ['water resources', 'GIS & remote sensing', 'flood & urban heat risk', 'sustainable development'];
  var el = $('#typed'), w = 0, c = 0, del = false;
  if (reduce) { el.textContent = words[0]; }
  else (function tick() {
    var word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 75);
  })();

  // 3D tilt on cards (fine pointers only)
  if (!reduce && matchMedia('(hover: hover)').matches) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateY(' + x * 8 + 'deg) rotateX(' + -y * 8 + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }
})();
