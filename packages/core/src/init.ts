import { RenderingModule } from './interfaces';

export class GameEngine {
  renderingContext: RenderingContext | null = null;
  renderingModule: RenderingModule | null = null;
  init() {}

  useAsRenderingModule(module: RenderingModule) {
    this.renderingModule = module;
    this.renderingContext = module.context;
  }
}
