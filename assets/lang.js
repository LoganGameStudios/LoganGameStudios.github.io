// Lingua del sito: italiano o inglese. Si ricorda la scelta; la prima volta usa quella del browser.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lg_lang'); } catch (e) {}
  var lang = saved || ((navigator.language || 'en').toLowerCase().indexOf('it') === 0 ? 'it' : 'en');
  root.setAttribute('lang', lang);
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        lang = root.getAttribute('lang') === 'it' ? 'en' : 'it';
        root.setAttribute('lang', lang);
        try { localStorage.setItem('lg_lang', lang); } catch (e) {}
      });
    });
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
