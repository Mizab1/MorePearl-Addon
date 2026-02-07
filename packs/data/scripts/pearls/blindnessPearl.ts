import { Entity, Vector3 } from "@minecraft/server";
import constants from "../constants";
import { teleportOwner } from "../utils/pearlUtils";
import { BasePearl } from "./basePearl";

export class BlindnessPearl extends BasePearl {
  constructor() {
    super(constants.BLINDNESS_PEARL.PEARL_ID, constants.BUFFER_DISTANCE);
  }

  protected onImpact(pearl: Entity, impactLocation: Vector3) {
    // Display Particle
    const particleLocation = {
      x: impactLocation.x,
      y: impactLocation.y + 2,
      z: impactLocation.z,
    };

    pearl.dimension.spawnParticle(constants.BLINDNESS_PEARL.PARTICLE_NAME, particleLocation);
    // Give Blindness to the nearby players
    pearl.dimension
      .getPlayers({
        location: pearl.location,
        maxDistance: constants.BLINDNESS_PEARL.IMPACT_DISTANCE,
      })
      .forEach((player) => {
        player.addEffect(constants.BLINDNESS_PEARL.EFFECT_NAME, constants.BLINDNESS_PEARL.EFFECT_TIME);
      });
    teleportOwner(pearl, impactLocation);
  }
}
