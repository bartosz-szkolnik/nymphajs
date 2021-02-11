import { Camera } from './camera';

export type Layer = (context: CanvasRenderingContext2D, camera: Camera) => void;

export class Compositor {
  private layers: Layer[] = [];

  addLayer(layer: Layer) {
    this.layers.push(layer);
  }

  draw(context: CanvasRenderingContext2D, camera: Camera) {
    this.layers.forEach((layer) => {
      layer(context, camera);
    });
  }
}
