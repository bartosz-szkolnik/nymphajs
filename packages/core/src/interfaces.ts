export interface RenderingModule {
  context: RenderingContext;
  init: (
    elementId: string
  ) => { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D };
  draw: (x: number, y: number, w: number, h: number) => void;
  drawImage: (img: HTMLImageElement) => void;
}
