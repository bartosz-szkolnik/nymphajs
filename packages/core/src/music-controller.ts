import { MusicPlayer } from './music-player';

export class MusicController {
  player: MusicPlayer | null = null;

  setPlayer(player: MusicPlayer) {
    this.player = player;
  }

  playTheme(speed = 1) {
    if (this.player) {
      const audio = this.player.playTrack('main');
      if (audio) {
        audio.playbackRate = speed;
      }
    }
  }

  playHurryTheme() {
    if (this.player) {
      const audio = this.player.playTrack('hurry');
      if (audio) {
        audio.loop = false;
        audio.addEventListener('ended', () => this.playTheme(1.3), {
          once: true,
        });
      }
    }
  }
}
