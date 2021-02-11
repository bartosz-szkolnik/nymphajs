import type { Entity } from './entity';
import type { Level } from './level';
import type { CollisionDirection } from './tile-collider';
import type { CollisionMatch } from './tile-resolver';

type Task = () => void;

export class Trait {
  private tasks: Task[] = [];
  constructor(public name: string) {}

  update(entity: Entity, deltaTime: number, level: Level) {}

  obstruct(entity: Entity, side: CollisionDirection, match: CollisionMatch) {}

  collides(us: Entity, them: Entity) {}

  queue(task: Task) {
    this.tasks.push(task);
  }

  finalize() {
    this.tasks.forEach((task) => task());
    this.tasks = [];
  }
}
