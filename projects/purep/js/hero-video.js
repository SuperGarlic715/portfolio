/* Show a muted background video only while playing; keep a photo during loading/errors. */
(() => {
  const hero = document.querySelector('.main_visual');
  const frame = document.querySelector('#purep-hero-video');
  if (!hero || !frame || window.matchMedia('(max-width: 768px)').matches) return;
  const url = new URL(frame.src);
  url.searchParams.set('origin', window.location.origin);
  frame.src = url.href;
  let revealTimer;
  function hidePlayer() {
    clearTimeout(revealTimer);
    hero.classList.remove('is-video-playing');
  }
  function revealWhenPlaying(player, startedAt) {
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) return;
    if (player.getCurrentTime() > startedAt) {
      hero.classList.add('is-video-playing');
    } else {
      revealTimer = setTimeout(() => revealWhenPlaying(player, startedAt), 200);
    }
  }
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
          hidePlayer();
          if (event.data === YT.PlayerState.PLAYING) {
            hideCaptions(event.target);
            const startedAt = event.target.getCurrentTime();
            // Wait beyond YouTube's initial player chrome and confirm playback advances.
            revealTimer = setTimeout(() => revealWhenPlaying(event.target, startedAt), 1200);
          }
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
