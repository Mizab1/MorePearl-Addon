import { Entity, Vector3 } from "@minecraft/server";
import constants from "../constants";

export function setOwner(entity: Entity) {
  const owner = entity.dimension.getPlayers({ location: entity.location, closest: 1, maxDistance: 5 })[0];

  if (owner) {
    entity.setDynamicProperty(constants.OWNER_TAG, owner.id);
  }
}

export function teleportOwner(pearl: Entity, location: Vector3) {
  const owner = getOwnerEntity(pearl);

  if (owner) {
    owner.teleport({ x: location.x, y: location.y + 1, z: location.z });
  }
}

export function getOwnerEntity(pearl: Entity) {
  const ownerId = pearl.getDynamicProperty(constants.OWNER_TAG);
  const allPlayers = pearl.dimension.getPlayers();
  const owner = allPlayers.find((player) => player.id === ownerId);
  return owner;
}

export function getEntityById(contextEntity: Entity, id: string) {
  if (contextEntity && id) {
    const allEntities = contextEntity.dimension.getEntities();
    const target = allEntities.find((e) => e.id === id);
    return target;
  }
}
