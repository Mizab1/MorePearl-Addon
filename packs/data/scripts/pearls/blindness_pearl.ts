import { Entity, world } from "@minecraft/server";
import { MinecraftDimensionTypes, MinecraftEffectTypes } from "@minecraft/vanilla-data";
import constants from "../constants";
import { setOwner, teleportOwner } from "../utils/pearlUtils";

export class BlindnessPearl {
  tick() {
    const pearls = world.getDimension(MinecraftDimensionTypes.Overworld).getEntities({
      type: constants.BLINDNESS_PEARL.PEARL_ID,
    });

    // For each pearl
    for (const pearl of pearls) {
      // Get the velocity and draw a ray in the direction
      const ray = pearl.dimension.getBlockFromRay(pearl.location, pearl.getVelocity(), {
        maxDistance: constants.BUFFER_DISTANCE,
        includePassableBlocks: false,
      });

      // If the ray hit something
      if (ray) {
        // Display Particle
        const particleLocation = {
          x: ray.block.location.x,
          y: ray.block.location.y + 2,
          z: ray.block.location.z,
        };
        pearl.dimension.spawnParticle("more_pearl:blindness_particle", particleLocation);

        // Give blindness
        pearl.dimension
          .getPlayers({
            location: pearl.location,
            maxDistance: constants.BLINDNESS_PEARL.IMPACT_DISTANT,
          })
          .forEach((player) => {
            player.addEffect(MinecraftEffectTypes.Blindness, constants.BLINDNESS_PEARL.EFFECT_TIME);
          });

        // Teleport the owner
        teleportOwner(pearl, ray.block.location);

        // Remove the pearl
        pearl.remove();
      }
    }
  }

  runAfterLaunch(pearl: Entity) {
    // set the owner of the entity
    setOwner(pearl);
  }
}
