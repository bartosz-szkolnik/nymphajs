import { MusicPlayer } from './music-player';

export class MusicController {
  player: MusicPlayer | null = null;

  setPlayer(player: MusicPlayer) {
    this.player = player;
  }
}
