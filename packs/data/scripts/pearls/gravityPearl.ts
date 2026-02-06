import { Entity, Vector3, world } from "@minecraft/server";
import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";
import constants from "../constants";

export class GravityPearl {
  tick() {
    const pearls = world.getDimension(MinecraftDimensionTypes.Overworld).getEntities({
      type: constants.GRAVITY_PEARL.PEARL_ID,
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
        pearl.dimension.spawnParticle(constants.GRAVITY_PEARL.PARTICLE_NAME, particleLocation);

        // Create a vacuum effect
        const nearbyEntities: Entity[] = pearl.dimension.getEntities({
          location: pearl.location,
          maxDistance: constants.GRAVITY_PEARL.IMPACT_DISTANCE,
          families: ["mob"],
        });
        nearbyEntities.forEach((entity) => {
          const direction: Vector3 = {
            x: (pearl.location.x - entity.location.x) * constants.GRAVITY_PEARL.STRENGTH,
            y: (pearl.location.y - entity.location.y) * constants.GRAVITY_PEARL.STRENGTH + 0.5,
            z: (pearl.location.z - entity.location.z) * constants.GRAVITY_PEARL.STRENGTH,
          };
          entity.applyImpulse(direction);
        });

        // Remove the pearl
        pearl.remove();
      }
    }
  }
}
