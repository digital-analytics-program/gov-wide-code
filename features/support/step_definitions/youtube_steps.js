import { Given, When } from "@cucumber/cucumber";

When("I wait for the YouTube iframe API to load", async function () {
  await this.page.waitForFunction(() => typeof YT !== 'undefined' && YT.loaded);
});

When("I play YouTube video {string}", async function (videoId) {
  await this.page.evaluate((id) => {
    const iframe = document.querySelector('iframe[id="' + id + '"]');
    const origin = new URL(iframe.src).origin;
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), origin);
  }, videoId);
});

const mockYouTubeScript = `
  window._ytPlayers = {};

  function MockPlayer(videoId, opts) {
    this._videoId = videoId;
    this._duration = 200;
    this._currentTime = 0;
    this._handlers = opts.events;
    window._ytPlayers[videoId] = this;
    if (opts.events.onReady) opts.events.onReady({ target: this });
  }
  MockPlayer.prototype.getDuration = function() { return this._duration; };
  MockPlayer.prototype.getCurrentTime = function() { return this._currentTime; };
  MockPlayer.prototype.seekTo = function(seconds) { this._currentTime = seconds; };
  MockPlayer.prototype.getVideoData = function() { return { video_id: this._videoId, title: 'Test Video' }; };
  MockPlayer.prototype.getVideoUrl = function() { return 'https://www.youtube.com/watch?v=' + this._videoId; };

  window.YT = {
    loaded: true,
    PlayerState: { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 },
    Player: MockPlayer
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

When("I simulate YouTube video {string} playing", async function (videoId) {
  await this.page.evaluate((id) => {
    const player = window._ytPlayers[id];
    player._handlers.onStateChange({ target: player, data: window.YT.PlayerState.PLAYING });
  }, videoId);
});

When("I simulate YouTube video {string} pausing", async function (videoId) {
  await this.page.evaluate((id) => {
    const player = window._ytPlayers[id];
    player._handlers.onStateChange({ target: player, data: window.YT.PlayerState.PAUSED });
  }, videoId);
});


When("I set the YouTube video {string} current time to {int}%", async function (videoId, percent) {
  await this.page.evaluate((id, pct) => {
    const player = window._ytPlayers[id];
    player.seekTo((pct / 100) * player.getDuration());
  }, videoId, percent);
});

When("I simulate YouTube video {string} completing", async function (videoId) {
  await this.page.evaluate((id) => {
    const player = window._ytPlayers[id];
    player._handlers.onStateChange({ target: player, data: window.YT.PlayerState.ENDED });
  }, videoId);
});

