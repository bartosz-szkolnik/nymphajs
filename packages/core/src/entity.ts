import { BoundingBox } from './bounding-box';
import { Vec2 } from './math';
import type { GameContext, Level } from './level';
import type { CollisionDirection } from './tile-collider';
import type { CollisionMatch } from './tile-resolver';
import { Trait } from './trait';
import type { AudioBoard } from './audio-board';
import { EventBuffer } from './event-buffer';

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
  events = new EventBuffer();

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
    this.events.emit(Trait.EVENT_TASK, this);

    this.traits.forEach((trait) => {
      trait.finalize(this);
    });

    this.events.clear();
  }

  playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach((name) => {
      audioBoard.playAudio(name, audioContext);
    });

    this.sounds.clear();
  }
}
