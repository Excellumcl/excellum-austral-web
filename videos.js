/* Los vídeos se activan al entrar en pantalla. */
(() => {
  'use strict';
  const videos = [...document.querySelectorAll('video')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width:1200px), (max-width:1400px) and (pointer:coarse)');
  const reducedData = matchMedia('(prefers-reduced-data: reduce)');
  const connection = navigator.connection;
  const visible = new Set();

  function refresh() {
    const saveData = reducedData.matches || connection?.saveData;
    for (const video of videos) {
      if (document.hidden || reducedMotion.matches || saveData || !visible.has(video)) {
        if (!video.paused) video.pause();
        continue;
      }
      const { mobile: mobileSource, desktop, videoSource, src } = video.dataset;
      const source = compact.matches && mobileSource ? mobileSource : desktop || videoSource || src;
      if (source && !video.hasAttribute('src')) video.src = source;
      video.muted = true;
      if (video.paused) video.play().catch(() => {});
    }
  }

  for (const video of videos) {
    video.addEventListener('playing', () => video.classList.add('ready'));
    video.addEventListener('error', () => video.classList.remove('ready'));
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      refresh();
    });
    videos.forEach(video => observer.observe(video));
  } else {
    const measure = () => {
      for (const video of videos) {
        const rect = video.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight) visible.add(video);
        else visible.delete(video);
      }
      refresh();
    };
    addEventListener('scroll', measure, {passive:true});
    addEventListener('resize', measure);
    measure();
  }

  document.addEventListener('visibilitychange', refresh);
  reducedMotion.addEventListener('change', refresh);
  reducedData.addEventListener('change', refresh);
  compact.addEventListener('change', refresh);
  connection?.addEventListener?.('change', refresh);
  addEventListener('pageshow', refresh);
})();
