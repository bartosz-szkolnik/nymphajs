import { SpriteSheet } from './spritesheet';

export class Font {
  constructor(private sprites: SpriteSheet, public size: number) {}

  print(text: string, context: CanvasRenderingContext2D, x: number, y: number) {
    const size = this.size;
    [...text].forEach((char, pos) => {
      this.sprites.draw(char, context, x + pos * size, y);
    });
  }
}
