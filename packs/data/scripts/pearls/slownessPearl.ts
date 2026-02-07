import { Entity, Vector3 } from "@minecraft/server";
import constants from "../constants";
import { teleportOwner } from "../utils/pearlUtils";
import { BasePearl } from "./basePearl";

export class SlownessPearl extends BasePearl {
  constructor() {
    super(constants.SLOWNESS_PEARL.PEARL_ID, constants.BUFFER_DISTANCE);
  }

  protected onImpact(pearl: Entity, impactLocation: Vector3) {
    // Display Particle
    const particleLocation = {
      x: impactLocation.x,
      y: impactLocation.y + 0.5,
      z: impactLocation.z,
    };
    pearl.dimension.spawnParticle(constants.SLOWNESS_PEARL.PARTICLE_NAME, particleLocation);

    // Give slowness to the nearby players
    pearl.dimension
      .getEntities({
        location: pearl.location,
        maxDistance: constants.SLOWNESS_PEARL.IMPACT_DISTANCE,
      })
      .forEach((entity) => {
        entity.addEffect(constants.SLOWNESS_PEARL.EFFECT_NAME, constants.SLOWNESS_PEARL.EFFECT_TIME);
      });

    teleportOwner(pearl, impactLocation);
  }
}
