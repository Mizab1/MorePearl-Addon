import { Entity, world } from "@minecraft/server";
import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";
import constants from "../constants";
import { setOwner, teleportOwner } from "../utils/pearlUtils";

export class SlownessPearl {
  tick() {
    const pearls = world.getDimension(MinecraftDimensionTypes.Overworld).getEntities({
      type: constants.SLOWNESS_PEARL.PEARL_ID,
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
          y: ray.block.location.y + 0.5,
          z: ray.block.location.z,
        };
        pearl.dimension.spawnParticle(constants.SLOWNESS_PEARL.PARTICLE_NAME, particleLocation);

        // Give blindness
        pearl.dimension
          .getEntities({
            location: pearl.location,
            maxDistance: constants.SLOWNESS_PEARL.IMPACT_DISTANCE,
          })
          .forEach((entity) => {
            entity.addEffect(constants.SLOWNESS_PEARL.EFFECT_NAME, constants.SLOWNESS_PEARL.EFFECT_TIME);
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
