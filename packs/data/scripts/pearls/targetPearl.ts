import { Entity, EntityHurtAfterEvent, Vector3 } from "@minecraft/server";
import constants from "../constants";
import { BasePearl } from "./basePearl";
import { getEntityById, getOwnerEntity } from "../utils/pearlUtils";

export class TargetPearl extends BasePearl {
  constructor() {
    super(constants.TARGET_PEARL.PEARL_ID, constants.BUFFER_DISTANCE);
  }

  protected onImpact(pearl: Entity, impactLocation: Vector3) {
    // Display Particle
    const particleLocation = {
      x: impactLocation.x,
      y: impactLocation.y + 0.5,
      z: impactLocation.z,
    };
    pearl.dimension.spawnParticle(constants.TARGET_PEARL.PARTICLE_NAME, particleLocation);

    // Teleport the last attacked entity
    const owner = getOwnerEntity(pearl);
    const attackedEntityId = owner?.getDynamicProperty(constants.ATTACKED_TAG);

    if (owner && attackedEntityId) {
      const attackedEntity = getEntityById(owner, attackedEntityId as string);

      if (attackedEntity) {
        attackedEntity.teleport(pearl.location);
      }
    }
  }

  public hurtEntity(event: EntityHurtAfterEvent, attacker: Entity) {
    // Capture and store who the player attacked last
    const hurtEntityId = event.hurtEntity.id;
    attacker.setDynamicProperty(constants.ATTACKED_TAG, hurtEntityId);
  }
}
