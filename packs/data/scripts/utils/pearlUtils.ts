import { Entity, Vector3 } from "@minecraft/server";

export function setOwner(entity: Entity) {
  const owner = entity.dimension.getPlayers({ location: entity.location, closest: 1, maxDistance: 5 })[0];

  if (owner) {
    entity.setDynamicProperty("owner", owner.id);
  }
}

export function teleportOwner(pearl: Entity, location: Vector3) {
  const ownerId = pearl.getDynamicProperty("owner");
  const allPlayers = pearl.dimension.getPlayers();
  const owner = allPlayers.find((player) => player.id === ownerId);

  if (owner) {
    owner.teleport({ x: location.x, y: location.y + 1, z: location.z });
  }
}
