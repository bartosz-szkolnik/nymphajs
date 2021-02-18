import type { Entity } from './entity';
import type { Matrix } from './math';
import { TileResolver } from './tile-resolver';
import type { GameContext, Level } from './level';
import type { TileCollisionHandler } from './tile-collision-handler';

export type CollisionDirection = 'bottom' | 'top' | 'right' | 'left';

export class TileCollider<T = unknown> {
  resolvers: TileResolver[] = [];
  handlers = new Map<string, TileCollisionHandler>();

  addGrid(tileMatrix: Matrix<Record<string, T>>) {
    const tileResolver = new TileResolver(tileMatrix);
    this.resolvers.push(tileResolver);
  }

  addCollisionHandler(handler: TileCollisionHandler) {
    this.handlers.set(handler.tileType, handler);
  }

  checkY(entity: Entity, gameContext: GameContext, level: Level) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        entity.bounds.left,
        entity.bounds.right,
        y,
        y
      );

      matches.forEach((match) => {
        // @TODO: Fix later
        const type = match.tile.type as string;
        const handler = this.handlers.get(type);

        if (handler) {
          handler.handleY({ entity, gameContext, match, resolver, level });
        }
      });
    }
  }

  checkX(entity: Entity, gameContext: GameContext, level: Level) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        x,
        x,
        entity.bounds.top,
        entity.bounds.bottom
      );

      matches.forEach((match) => {
        // @TODO: Fix later
        const type = match.tile.type as string;
        const handler = this.handlers.get(type);

        if (handler) {
          handler.handleX({ entity, gameContext, match, resolver, level });
        }
      });
    }
  }
}
