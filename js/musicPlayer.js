class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.isPlaying = false;
  }

  init() {
    return new Promise((resolve) => {
      this.audio.addEventListener('canplaythrough', resolve);
      this.audio.src = 'audio/music2.wav';
    });
  }

  playMusic(play = true) {
    if (!this.isPlaying && play) {
      this.audio.currentTime = 0;
      this.audio.play();
      this.isPlaying = true;
    } else {
      this.audio.pause();
      this.isPlaying = false;
    }
  }
}