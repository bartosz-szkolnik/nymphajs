export class CanvasModule {
  init(element: string | Element) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    canvas.width = 256;
    canvas.height = 240;
    canvas.id = 'screen';

    if (element instanceof Element) {
      element.appendChild(canvas);
    } else {
      document.querySelector(element)!.appendChild(canvas);
    }

    return { canvas, context: ctx };
  }

  draw(x: number, y: number, w: number, h: number) {
    // this.context.fillRect(x, y, w, h);
  }

  drawImage(img: HTMLImageElement) {
    // this.context.drawImage(img, 0, 0);
  }

  drawTile() {}

  getRenderingContext() {}
}

export function createCanvas(element: string | Element) {
  if (element instanceof HTMLCanvasElement) {
    const ctx = element.getContext('2d');
    return { canvas: element, context: ctx };
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  canvas.width = 256;
  canvas.height = 240;
  canvas.id = 'screen';

  if (element instanceof Element) {
    element.appendChild(canvas);
  } else {
    const container = document.querySelector(element);
    container!.appendChild(canvas);
  }

  return { canvas, context: ctx };
}
