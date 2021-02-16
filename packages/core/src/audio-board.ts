export class AudioBoard {
  private buffers = new Map<string, AudioBuffer>();

  addAudio(name: string, buffer: AudioBuffer) {
    this.buffers.set(name, buffer);
  }

  playAudio(name: string, context: AudioContext) {
    const source = context.createBufferSource();
    const gainNode = context.createGain();
    gainNode.gain.value = 0.3;
    source.connect(gainNode);
    gainNode.connect(context.destination);
    const buffer = this.buffers.get(name);

    if (buffer) {
      source.buffer = buffer;
      source.start(0);
    }
  }
}
