import { Given, When } from "@cucumber/cucumber";

const mockYouTubeScript = `
  window._ytPlayers = {};
  window.YT = {
    PlayerState: { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 },
    Player: function(videoId, opts) {
      this.playerInfo = {
        videoData: { video_id: videoId, title: 'Test Video' },
        videoUrl: 'https://www.youtube.com/watch?v=' + videoId,
        currentTime: 0,
        duration: 4
      };
      this._handlers = opts.events;
      window._ytPlayers[videoId] = this;
      if (opts.events.onReady) opts.events.onReady({ target: this });
    }
  };
  setTimeout(function() {
    if (window.onYouTubeIframeAPIReady) window.onYouTubeIframeAPIReady();
  }, 200);
`;

Given("I mock the YouTube IFrame API", async function () {
  await this.page.setRequestInterception(true);
  this.page.on('request', (request) => {
    if (request.url().includes('youtube.com/iframe_api')) {
      request.respond({ status: 200, contentType: 'application/javascript', body: mockYouTubeScript });
    } else {
      request.continue();
    }
  });
});

When("I simulate YouTube video {string} playing from the beginning", async function (videoId) {
  await this.page.evaluate((id) => {
    const player = window._ytPlayers[id];
    player.playerInfo.currentTime = 0;
    player._handlers.onStateChange({ target: player, data: window.YT.PlayerState.PLAYING });
  }, videoId);
});

When("I simulate YouTube video {string} pausing", async function (videoId) {
  await this.page.evaluate((id) => {
    const player = window._ytPlayers[id];
    player._handlers.onStateChange({ target: player, data: window.YT.PlayerState.PAUSED });
  }, videoId);
});

When("I simulate YouTube video {string} playing", async function (videoId) {
  await this.page.evaluate((id) => {
    const player = window._ytPlayers[id];
    player._handlers.onStateChange({ target: player, data: window.YT.PlayerState.PLAYING });
  }, videoId);
});

When("I simulate YouTube video {string} completing", async function (videoId) {
  await this.page.evaluate((id) => {
    const player = window._ytPlayers[id];
    player._handlers.onStateChange({ target: player, data: window.YT.PlayerState.ENDED });
  }, videoId);
});

When("I set the YouTube video {string} current time to {int}%", async function (videoId, percent) {
  await this.page.evaluate((id, pct) => {
    const player = window._ytPlayers[id];
    player.playerInfo.currentTime = (pct / 100) * player.playerInfo.duration;
  }, videoId, percent);
});
