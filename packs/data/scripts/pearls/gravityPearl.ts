import { Entity, Vector3 } from "@minecraft/server";
import constants from "../constants";
import { BasePearl } from "./basePearl";

export class GravityPearl extends BasePearl {
  constructor() {
    super(constants.GRAVITY_PEARL.PEARL_ID, constants.BUFFER_DISTANCE);
  }

  protected onImpact(pearl: Entity, impactLocation: Vector3) {
    // Display Particle
    const particleLocation = {
      x: impactLocation.x,
      y: impactLocation.y + 0.5,
      z: impactLocation.z,
    };
    pearl.dimension.spawnParticle(constants.GRAVITY_PEARL.PARTICLE_NAME, particleLocation);

    // Create a vacuum effect
    const nearbyEntities: Entity[] = pearl.dimension.getEntities({
      location: pearl.location,
      maxDistance: constants.GRAVITY_PEARL.IMPACT_DISTANCE,
      excludeFamilies: ["inanimate"],
    });
    nearbyEntities.forEach((entity) => {
      const direction: Vector3 = {
        x: (pearl.location.x - entity.location.x) * constants.GRAVITY_PEARL.STRENGTH,
        y: (pearl.location.y - entity.location.y) * constants.GRAVITY_PEARL.STRENGTH + 0.5,
        z: (pearl.location.z - entity.location.z) * constants.GRAVITY_PEARL.STRENGTH,
      };
      entity.applyImpulse(direction);
    });
  }
}
