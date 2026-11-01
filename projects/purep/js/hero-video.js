/* Show a muted background video only while playing; keep a photo during loading/errors. */
(() => {
  const hero = document.querySelector('.main_visual');
  const frame = document.querySelector('#purep-hero-video');
  if (!hero || !frame || window.matchMedia('(max-width: 768px)').matches) return;
  const url = new URL(frame.src);
  url.searchParams.set('origin', window.location.origin);
  frame.src = url.href;
  function hidePlayer() { hero.classList.remove('is-video-playing'); }
  function hideCaptions(player) { player.unloadModule('captions'); }
  function init() {
    new YT.Player(frame.id, {
      events: {
        onReady(event) {
          event.target.mute();
          hideCaptions(event.target);
          event.target.playVideo();
        },
        onApiChange(event) { hideCaptions(event.target); },
        onStateChange(event) {
          hero.classList.toggle('is-video-playing', event.data === YT.PlayerState.PLAYING);
          if (event.data === YT.PlayerState.PLAYING) hideCaptions(event.target);
          if (event.data === YT.PlayerState.ENDED) event.target.playVideo();
        },
        onError: hidePlayer
      }
    });
  }
  if (window.YT?.Player) init();
  else {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previous?.(); init(); };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = hidePlayer;
    document.head.append(script);
  }
})();
