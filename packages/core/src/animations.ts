export type Animation = (distance: number) => string;

export function createAnimation(frames: string[], frameLen: number): Animation {
  return function resolveFrame(distance: number) {
    const frameIndex = Math.floor(distance / frameLen) % frames.length;
    return frames[frameIndex];
  };
}
