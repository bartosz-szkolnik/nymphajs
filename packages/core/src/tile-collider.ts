import type { Entity } from './entity';
import { Matrix } from './math';
import { TileResolver } from './tile-resolver';

export type CollisionDirection = 'bottom' | 'top' | 'right' | 'left';

export class TileCollider<T = unknown> {
  tiles: TileResolver<T>;

  constructor(tileMatrix: Matrix<Record<string, T>>) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkY(entity: Entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y
    );

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.bounds.bottom = match.y1;
          entity.vel.y = 0;

          entity.obstruct('bottom');
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2;
          entity.vel.y = 0;

          entity.obstruct('top');
        }
      }
    });
  }

  checkX(entity: Entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom
    );

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.bounds.right = match.x1;
          entity.vel.x = 0;

          entity.obstruct('right');
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2;
          entity.vel.x = 0;

          entity.obstruct('left');
        }
      }
    });
  }
}
