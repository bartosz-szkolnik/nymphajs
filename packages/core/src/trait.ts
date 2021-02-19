import type { Entity } from './entity';
import type { GameContext, Level } from './level';
import type { CollisionDirection } from './tile-collider';
import type { CollisionMatch } from './tile-resolver';

type Task = (entity: Entity) => void;
type Listener<T = string | symbol, D = any> = {
  name: T;
  callback: (...data: D[]) => void;
  count: number;
};

export class Trait {
  static EVENT_TASK = Symbol('task');
  private listeners: Listener[] = [];

  constructor(public name: string) {}

  update(entity: Entity, gameContext: GameContext, level: Level) {}

  listen(
    name: string | symbol,
    callback: Listener['callback'],
    count = Infinity
  ) {
    const listener = { name, callback, count };
    this.listeners.push(listener);
  }

  obstruct(entity: Entity, side: CollisionDirection, match: CollisionMatch) {}

  collides(us: Entity, them: Entity) {}

  queue(task: Task) {
    this.listen(Trait.EVENT_TASK, task, 1);
  }

  finalize(entity: Entity) {
    this.listeners = this.listeners.filter((listener) => {
      entity.events.process(listener.name, listener.callback);
      return --listener.count;
    });
  }
}
