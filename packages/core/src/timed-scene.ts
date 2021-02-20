import type { GameContext } from './level';
import { Scene } from './scene';

export class TimedScene extends Scene {
  private countdown = 2;

  update({ deltaTime }: GameContext) {
    this.countdown -= deltaTime;
    if (this.countdown <= 0) {
      this.events.emit(Scene.EVENT_COMPLETE);
    }
  }
}
