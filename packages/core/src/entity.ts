import { BoundingBox } from './bounding-box';
import { Level } from './level';
import { Vec2 } from './math';
import { CollisionDirection } from './tile-collider';
import { Trait } from './trait';

export class Entity {
  canCollide = true;

  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds = new BoundingBox(this.pos, this.size, this.offset);
  lifetime = 0;

  traits: Map<string, Trait> = new Map();

  addTrait(name: string, trait: Trait) {
    this.traits.set(name, trait);
  }

  getTrait<T extends Trait>(name: string) {
    return this.traits.get(name)! as T;
  }

  hasTrait(name: string) {
    return this.traits.has(name);
  }

  update(deltaTime: number, level: Level) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime, level);
    });

    this.lifetime += deltaTime;
  }

  obstruct(side: CollisionDirection) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }

  turbo(turboOn: boolean) {}

  collides(candidate: Entity) {
    this.traits.forEach((trait) => {
      trait.collides(this, candidate);
    });
  }

  finalize() {
    this.traits.forEach((trait) => {
      trait.finalize();
    });
  }
}
