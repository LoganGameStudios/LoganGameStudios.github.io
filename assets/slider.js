// Slider delle schermate: frecce, puntini, scorrimento col dito e frecce della tastiera.
document.querySelectorAll('[data-slider]').forEach(function (slider) {
  var track = slider.querySelector('.slides');
  var imgs = track.querySelectorAll('img');
  var dotsBox = slider.querySelector('.dots');
  var dots = [];

  function current() { return Math.round(track.scrollLeft / track.clientWidth); }
  function go(i) {
    var n = imgs.length;
    i = (i + n) % n; // dall'ultima si torna alla prima
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
  }

  imgs.forEach(function (_, i) {
    var d = document.createElement('span');
    d.addEventListener('click', function () { go(i); });
    dotsBox.appendChild(d);
    dots.push(d);
  });
  function mark() {
    var c = current();
    dots.forEach(function (d, i) { d.classList.toggle('on', i === c); });
  }

  slider.querySelector('.prev').addEventListener('click', function () { go(current() - 1); });
  slider.querySelector('.next').addEventListener('click', function () { go(current() + 1); });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(mark); });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
  });
  window.addEventListener('resize', function () { track.scrollLeft = current() * track.clientWidth; });
  mark();
});
