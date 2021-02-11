import type { Entity } from './entity';
import { Level } from './level';
import type { CollisionDirection } from './tile-collider';

type Task = () => void;

export class Trait {
  private tasks: Task[] = [];
  constructor(public name: string) {}

  update(entity: Entity, deltaTime: number, level: Level) {}

  obstruct(entity: Entity, side: CollisionDirection) {}

  collides(us: Entity, them: Entity) {}

  queue(task: Task) {
    this.tasks.push(task);
  }

  finalize() {
    this.tasks.forEach((task) => task());
    this.tasks = [];
  }
}
