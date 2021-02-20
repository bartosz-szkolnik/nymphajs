import { GameContext } from './level';
import { Scene } from './scene';

export class SceneRunner {
  sceneIndex = -1;
  scenes: Scene[] = [];

  addScene(scene: Scene) {
    scene.events.listen(Scene.EVENT_COMPLETE, () => {
      this.runNext();
    });

    this.scenes.push(scene);
  }

  runNext() {
    const currentScene = this.scenes[this.sceneIndex];
    if (currentScene) {
      currentScene.pause();
    }

    this.sceneIndex++;
  }

  update(gameContext: GameContext) {
    const currentScene = this.scenes[this.sceneIndex];

    if (currentScene) {
      currentScene.update(gameContext);
      currentScene.draw(gameContext);
    }
  }
}
