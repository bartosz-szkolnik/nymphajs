import { Entity } from './entity';
import { GameContext, Level } from './level';
import { CollisionMatch, TileResolver } from './tile-resolver';

export type TileCollisionContext = {
  entity: Entity;
  match: CollisionMatch;
  resolver: TileResolver;
  gameContext: GameContext;
  level: Level;
};

export interface TileCollisionHandler {
  tileType: string;
  handleX(context: TileCollisionContext): void;
  handleY(context: TileCollisionContext): void;
}
