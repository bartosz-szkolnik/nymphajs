export class MusicPlayer {
  tracks = new Map<string, HTMLAudioElement>();

  addTrack(name: string, url: string) {
    const audio = new Audio();
    audio.loop = true;
    audio.src = '/assets' + url;

    this.tracks.set(name, audio);
  }

  playTrack(name: string) {
    const track = this.tracks.get(name);
    if (track) {
      track.play();
    }
  }

  stopTrack() {
    const track = [...this.tracks].find((track) => !track[1].paused);
    track?.[1].pause();
  }
}
