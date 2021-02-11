import type { Animation } from '@nymphajs/core';

export class SpriteSheet {
  private tiles = new Map<string, HTMLCanvasElement[]>();
  animations = new Map<string, Animation>();

  constructor(
    private image: HTMLImageElement,
    private width: number,
    private height: number
  ) {}

  define(name: string, x: number, y: number, width: number, height: number) {
    const buffers = [false, true].map((flip) => {
      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;

      const ctx = buffer.getContext('2d')!;

      if (flip) {
        ctx.scale(-1, 1);
        ctx.translate(-width, 0);
      }

      ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);

      return buffer;
    });

    this.tiles.set(name, buffers);
  }

  defineTile(name: string, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  defineAnimation(name: string, animation: Animation) {
    this.animations.set(name, animation);
  }

  draw(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    flip = false
  ) {
    const buffer = this.tiles.get(name)!;
    context.drawImage(buffer[flip ? 1 : 0], x, y);
  }

  drawTile(name: string, ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, ctx, x * this.width, y * this.height);
  }

  drawAnimation(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    distance: number
  ) {
    const animation = this.animations.get(name);
    if (!animation) {
      return;
    }

    this.drawTile(animation(distance), context, x, y);
  }
}
