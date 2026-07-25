// =========================================================
// Youshimart & Itzel — script.js
// =========================================================

(function () {
  'use strict';

  /* -----------------------------------------------------
     Live countdown to the wedding
  ----------------------------------------------------- */
  var WEDDING_DATE = new Date(2026, 8, 25, 16, 30, 0); // 25 sep 2026, 4:30pm (local time)

  var elDays  = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins  = document.getElementById('cd-mins');
  var elSecs  = document.getElementById('cd-secs');
  var grid    = document.getElementById('countdown-grid');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    var now = new Date();
    var diff = WEDDING_DATE - now;

    if (diff <= 0) {
      if (grid) {
        grid.innerHTML = '<div class="countdown-done">¡Hoy nos casamos! 🎉</div>';
      }
      clearInterval(timer);
      return;
    }

    var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var mins  = Math.floor((diff / (1000 * 60)) % 60);
    var secs  = Math.floor((diff / 1000) % 60);

    if (elDays)  elDays.textContent  = pad(days);
    if (elHours) elHours.textContent = pad(hours);
    if (elMins)  elMins.textContent  = pad(mins);
    if (elSecs)  elSecs.textContent  = pad(secs);
  }

  updateCountdown();
  var timer = setInterval(updateCountdown, 1000);

  /* -----------------------------------------------------
     Scroll-spy: highlight active nav link
  ----------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href').slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* -----------------------------------------------------
     Parallax float for the scattered bloom decorations
  ----------------------------------------------------- */
  var blooms = Array.prototype.slice.call(document.querySelectorAll('.bloom'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (blooms.length && !reduceMotion) {
    var ticking = false;

    function applyParallax() {
      var scrollY = window.scrollY || window.pageYOffset;
      blooms.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
        var offset = scrollY * speed;
        el.style.setProperty('--py', offset.toFixed(1) + 'px');
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }

    applyParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -----------------------------------------------------
     Reveal-on-scroll animations
  ----------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var reveal = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { reveal.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
