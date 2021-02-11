import type { Entity } from './entity';
import { Level } from './level';
import type { CollisionDirection } from './tile-collider';

export class Trait {
  constructor(public name: string) {}

  update(entity: Entity, deltaTime: number, level: Level) {}

  obstruct(entity: Entity, side: CollisionDirection) {}

  collides(us: Entity, them: Entity) {}
}
