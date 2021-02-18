import { Compositor } from './compositor';
import { Entity } from './entity';
import { EntityCollider } from './entity-collider';
import { MusicController } from './music-controller';
import { TileCollider } from './tile-collider';

export type Tile = {
  name: string;
  type?: 'ground';
};

export type Factory = () => Entity;
export type EntityFactories = Record<string, Factory>;

export type GameContext = {
  audioContext: AudioContext;
  deltaTime: number;
  entityFactory: EntityFactories;
};

export class Level {
  compositor = new Compositor();
  entities = new Set<Entity>();
  gravity = 1500;
  totalTime = 0;

  musicController = new MusicController();

  entityCollider = new EntityCollider(this.entities);
  tileCollider = new TileCollider();

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
}
