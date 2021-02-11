import { Entity } from '@nymphajs/core';
import { Renderable } from './renderable';

export function isRenderable(entity: Entity): entity is Renderable {
  if (!entity.hasOwnProperty('draw')) {
    return false;
  }

  return typeof (entity as Renderable).draw === 'function';
}
