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

export type GameContext = {
  audioContext: AudioContext;
  deltaTime: number;
};

export class Level {
  compositor = new Compositor();
  entities = new Set<Entity>();
  gravity = 1500;
  totalTime = 0;

  entityCollider = new EntityCollider(this.entities);
  tileCollider: TileCollider | null = null;

  update(gameContext: GameContext) {
    this.entities.forEach((entity) => {
      entity.update(gameContext, this);
    });

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    });

    this.entities.forEach((entity) => {
      entity.finalize();
    });

    this.totalTime += gameContext.deltaTime;
  }

  setCollisionGrid(matrix: Matrix<CollisionTile>) {
    this.tileCollider = new TileCollider(matrix);
  }
}
