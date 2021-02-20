import { Camera } from './camera';
import { Entity } from './entity';
import { EntityCollider } from './entity-collider';
import { MusicController } from './music-controller';
import { Scene } from './scene';
import { TileCollider } from './tile-collider';

export type Tile = {
  name: string;
  type?: 'ground';
};

export type Factory = () => Entity;
export type EntityFactories = Record<string, Factory>;

export type GameContext = {
  audioContext: AudioContext;
  videoContext: CanvasRenderingContext2D;
  deltaTime: number;
  entityFactory: EntityFactories;
};

function focusPlayer(level: Level) {
  // @TODO: needs to be somewhere else, cause here we dont have access to game-specific traits
  // prettier-ignore
  const players = [...level.entities].filter((entity) => entity.hasTrait('player'));
  for (const player of players) {
    level.camera.position.x = Math.max(0, player.pos.x - 100);
  }
}

export class Level extends Scene {
  static EVENT_TRIGGER = Symbol('trigger');

  name = '';
  entities = new Set<Entity>();
  gravity = 1500;
  totalTime = 0;
  camera = new Camera();

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

    focusPlayer(this);

    this.totalTime += gameContext.deltaTime;
  }

  draw({ videoContext }: GameContext) {
    this.compositor.draw(videoContext, this.camera);
  }

  pause() {
    this.musicController.pause();
  }
}
