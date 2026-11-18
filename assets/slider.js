// Slider delle schermate: frecce, puntini, scorrimento col dito e frecce della tastiera.
// Una voce può essere un video ospitato sul sito (.video[data-video]): finché non si preme play si vede
// solo l'anteprima e il file del video non viene scaricato.
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

  // video: al clic su play l'anteprima lascia il posto al lettore del browser.
  // L'anteprima resta dietro, sfocata, a riempire i lati (il riquadro è più largo del video).
  items.forEach(function (item) {
    if (!item.hasAttribute('data-video')) return;
    var video = null;
    item.querySelector('.play').addEventListener('click', function () {
      video = document.createElement('video');
      video.src = item.getAttribute('data-video');
      video.poster = item.querySelector('img').getAttribute('src');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'auto';
      item.appendChild(video);
      item.classList.add('playing');
      var p = video.play();
      if (p && p.catch) p.catch(function () {}); // se il browser blocca l'avvio, restano i comandi del lettore
      video.focus();
    });
    // passando a un'altra immagine il video si ferma e torna l'anteprima
    item._reset = function () {
      if (!video) return;
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.remove();
      video = null;
      item.classList.remove('playing');
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
