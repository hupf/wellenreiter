import { Howl } from 'howler';

const FADE_TIME = 300;

class Player {
  sound = null;

  play(url) {
    return Promise.all([this.stop(), this.getStreamUrl(url)]).then(
      ([_, streamUrl]) => {
        this.sound = new Howl({
          src: streamUrl,
          html5: true,
          volume: 0
        });
        this.soundId = this.sound.play();
        this.sound.fade(0, 1, FADE_TIME);
        return new Promise(resolve => setTimeout(resolve, FADE_TIME));
      }
    );
  }

  stop() {
    return new Promise(resolve => {
      this.sound && this.sound.fade(1, 0, FADE_TIME);
      setTimeout(() => {
        this.sound && this.sound.unload();
        this.sound = null;
        this.soundId = null;
        resolve();
      }, this.sound ? FADE_TIME : 0);
    });
  }

  getStreamUrl(url) {
    if (/\.m3u8?$/.test(url)) {
      return this.fetchM3U(url);
    } else {
      return new Promise(resolve => {
        resolve(url);
      });
    }
  }

  fetchM3U(url) {
    return fetch(url)
      .then(response => response.text())
      .then(data => this.parseM3U(data));
  }

  parseM3U(data) {
    return data.split('\n').find(line => {
      const firstChar = line.trim()[0];
      return firstChar != null && firstChar !== '#';
    });
  }

  // get isPlaying() {
  //   return this.soundId && this.sound && this.sound.playing(this.soundId);
  // }
}

export default Player;
