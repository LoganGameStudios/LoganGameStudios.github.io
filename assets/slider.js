// Slider delle schermate: frecce, puntini, scorrimento col dito e frecce della tastiera.
// Una voce può essere un video di YouTube (.video[data-yt]): finché non si preme play si vede solo
// l'anteprima ospitata sul sito, quindi il browser non contatta YouTube.
document.querySelectorAll('[data-slider]').forEach(function (slider) {
  var track = slider.querySelector('.slides');
  var items = Array.prototype.slice.call(track.children);
  var dotsBox = slider.querySelector('.dots');
  var dots = [];

  // la larghezza è 0 finché lo slider è nascosto (serie dell'altra lingua)
  function current() { return track.clientWidth ? Math.round(track.scrollLeft / track.clientWidth) : 0; }
  function go(i) {
    var n = items.length;
    i = (i + n) % n; // dall'ultima si torna alla prima
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
  }

  items.forEach(function (_, i) {
    var d = document.createElement('span');
    d.addEventListener('click', function () { go(i); });
    dotsBox.appendChild(d);
    dots.push(d);
  });

  // video: al clic su play l'anteprima viene sostituita dal lettore (dominio youtube-nocookie)
  items.forEach(function (item) {
    if (!item.hasAttribute('data-yt')) return;
    var poster = item.innerHTML;
    item.addEventListener('click', function (e) {
      if (!e.target.closest('.play')) return;
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + item.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = item.getAttribute('data-yt-title') || 'Video';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      item.innerHTML = '';
      item.appendChild(f);
      item.classList.add('playing');
    });
    // passando a un'altra immagine il video si ferma e torna l'anteprima
    item._reset = function () {
      if (item.classList.contains('playing')) { item.innerHTML = poster; item.classList.remove('playing'); }
    };
  });

  function mark() {
    var c = current();
    dots.forEach(function (d, i) { d.classList.toggle('on', i === c); });
    items.forEach(function (item, i) { if (item._reset && i !== c && track.clientWidth) item._reset(); });
  }

  slider.querySelector('.prev').addEventListener('click', function () { go(current() - 1); });
  slider.querySelector('.next').addEventListener('click', function () { go(current() + 1); });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(mark); });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
  });
  // quando cambia la larghezza (finestra ridimensionata o slider che compare cambiando lingua)
  // resta sull'immagine giusta e aggiorna i puntini
  var shown = 0;
  function realign() {
    if (track.clientWidth) track.scrollLeft = shown * track.clientWidth;
    mark();
  }
  track.addEventListener('scroll', function () { if (track.clientWidth) shown = current(); });
  if ('ResizeObserver' in window) new ResizeObserver(realign).observe(track);
  else window.addEventListener('resize', realign);
  mark();
});
