import { RenderingModule } from '@nymphajs/core';

export class CanvasModule implements RenderingModule {
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  init(elementId: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    canvas.width = 256;
    canvas.height = 240;

    this.canvas = canvas;
    this.context = ctx;

    canvas.id = 'screen';
    document.getElementById(elementId)!.appendChild(canvas);

    return { canvas, context: ctx };
  }

  draw(x: number, y: number, w: number, h: number) {
    this.context.fillRect(x, y, w, h);
  }

  drawImage(img: HTMLImageElement) {
    this.context.drawImage(img, 0, 0);
  }

  drawTile() {}

  getRenderingContext() {}
}
