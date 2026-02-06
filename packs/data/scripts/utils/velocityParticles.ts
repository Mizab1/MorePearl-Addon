import { Entity, MolangVariableMap, Vector3 } from "@minecraft/server";

export function velocityParticles(pearl: Entity, velocity: Vector3) {
  let molang = new MolangVariableMap();
  molang.setSpeedAndDirection("more_pearls:emitter", 0.5, velocity);
  pearl.dimension.spawnParticle("minecraft:basic_crit_particle", pearl.location, molang);
}
