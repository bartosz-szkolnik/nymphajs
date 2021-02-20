import { Camera } from './camera';
import { Compositor } from './compositor';
import { EventEmitter } from './event-emitter';
import { GameContext } from './level';

export interface SceneLike {
  load: () => {};
  start: () => {};
  update: () => {};
}

export class Scene {
  static EVENT_COMPLETE = Symbol('scene-complete');

  events = new EventEmitter();
  compositor = new Compositor();

  update(gameContext: GameContext) {}
  draw(gameContext: GameContext) {
    this.compositor.draw(gameContext.videoContext, new Camera());
  }

  pause() {
    console.log('Paused');
  }
}
