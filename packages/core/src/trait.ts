import type { AudioBoard } from './audio-board';
import type { Entity } from './entity';
import type { GameContext, Level } from './level';
import type { CollisionDirection } from './tile-collider';
import type { CollisionMatch } from './tile-resolver';

type Task = () => void;

export class Trait {
  protected sounds = new Set<string>();
  private tasks: Task[] = [];

  constructor(public name: string) {}

  update(entity: Entity, gameContext: GameContext, level: Level) {}

  obstruct(entity: Entity, side: CollisionDirection, match: CollisionMatch) {}

  collides(us: Entity, them: Entity) {}

  queue(task: Task) {
    this.tasks.push(task);
  }

  finalize() {
    this.tasks.forEach((task) => task());
    this.tasks = [];
  }

  playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach((name) => {
      audioBoard.playAudio(name, audioContext);
    });

    this.sounds.clear();
  }
}
