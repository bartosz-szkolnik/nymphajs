import { Compositor } from './compositor';
import { Entity } from './entity';
import { EntityCollider } from './entity-collider';
import { Matrix } from './math';
import { TileCollider } from './tile-collider';

export type GameTile = {
  name: string;
};

export type CollisionTile = {
  type?: 'ground';
};

export class Level {
  compositor = new Compositor();
  entities = new Set<Entity>();
  gravity = 1500;
  totalTime = 0;

  entityCollider = new EntityCollider(this.entities);
  tileCollider: TileCollider | null = null;

  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime, this);

      entity.pos.x += entity.vel.x * deltaTime;
      if (entity.canCollide) {
        this.tileCollider?.checkX(entity);
      }

      entity.pos.y += entity.vel.y * deltaTime;
      if (entity.canCollide) {
        this.tileCollider?.checkY(entity);
      }
      entity.vel.y += this.gravity * deltaTime;
    });

    this.entities.forEach((entity) => {
      if (entity.canCollide) {
        this.entityCollider.check(entity);
      }
    });

    this.totalTime += deltaTime;
  }

  setCollisionGrid(matrix: Matrix<CollisionTile>) {
    this.tileCollider = new TileCollider(matrix);
  }
}
