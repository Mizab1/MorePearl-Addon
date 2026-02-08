import { Entity, Vector3 } from "@minecraft/server";
import constants from "../constants";
import { BasePearl } from "./basePearl";
import { getOwnerEntity } from "../utils/pearlUtils";

export class SwapPearl extends BasePearl {
  constructor() {
    super(constants.SWAP_PEARL.PEARL_ID, constants.BUFFER_DISTANCE);
  }

  protected onImpact(pearl: Entity, impactLocation: Vector3) {
    // Display Particle
    const particleLocation = {
      x: impactLocation.x,
      y: impactLocation.y + 0.5,
      z: impactLocation.z,
    };
    pearl.dimension.spawnParticle(constants.SWAP_PEARL.PARTICLE_NAME, particleLocation);

    // Swap the player with pearl nearest player
    const pearlLocation = pearl.location;
    const owner = getOwnerEntity(pearl);
    const ownerLocation = owner?.location;

    const nearestEntity = pearl.dimension.getEntities({
      location: pearlLocation,
      minDistance: constants.SWAP_PEARL.MIN_DISTANCE,
      maxDistance: constants.SWAP_PEARL.IMPACT_DISTANCE,
      excludeFamilies: ["inanimate"],
      closest: 1,
    })[0];

    if (!nearestEntity) {
      owner?.sendMessage({ rawtext: [{ text: constants.COLOR.Red }, { translate: "generic.unable_to_swap" }] });
      return;
    }

    if (ownerLocation && owner) {
      owner.teleport(pearlLocation);
      nearestEntity.teleport(ownerLocation);
    }
  }
}
