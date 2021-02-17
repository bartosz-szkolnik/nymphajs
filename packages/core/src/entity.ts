import { BoundingBox } from './bounding-box';
import { Vec2 } from './math';
import type { GameContext, Level } from './level';
import type { CollisionDirection } from './tile-collider';
import type { CollisionMatch } from './tile-resolver';
import type { Trait } from './trait';
import type { AudioBoard } from './audio-board';

export class Entity {
  audio: AudioBoard | null = null;
  sounds = new Set<string>();

  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds = new BoundingBox(this.pos, this.size, this.offset);
  lifetime = 0;

  traits = new Map<string, Trait>();

  addTrait(name: string, trait: Trait) {
    this.traits.set(name, trait);
  }

  getTrait<T extends Trait>(name: string) {
    return this.traits.get(name)! as T;
  }

  hasTrait(name: string) {
    return this.traits.has(name);
  }

  update(gameContext: GameContext, level: Level) {
    this.traits.forEach((trait) => {
      trait.update(this, gameContext, level);
    });

    if (this.audio) {
      this.playSounds(this.audio, gameContext.audioContext);
    }

    this.lifetime += gameContext.deltaTime;
  }

  obstruct(side: CollisionDirection, match: CollisionMatch) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side, match);
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

  playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach((name) => {
      audioBoard.playAudio(name, audioContext);
    });

    this.sounds.clear();
  }
}
