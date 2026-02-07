import { Entity, EquipmentSlot, system, world } from "@minecraft/server";
import { BlindnessPearl } from "./pearls/blindnessPearl";
import { GravityPearl } from "./pearls/gravityPearl";
import { SlownessPearl } from "./pearls/slownessPearl";
import { SwapPearl } from "./pearls/swapPearl";
import { TargetPearl } from "./pearls/targetPearl";
import { BasePearl } from "./pearls/basePearl";

const pearls = [new BlindnessPearl(), new SlownessPearl(), new GravityPearl(), new SwapPearl(), new TargetPearl()];

system.runInterval(() => {
  const activeDimensions = new Set(world.getAllPlayers().map((p) => p.dimension));

  for (const dimension of activeDimensions) {
    for (const pearlClass of pearls) {
      const pearlEntities: Entity[] = dimension.getEntities({ type: pearlClass.typeId });
      // Skip the current pearlClass since there is no pearl
      if (pearlEntities.length === 0) continue;

      pearlClass.tick(pearlEntities);
    }
  }
}, 1);

world.afterEvents.entitySpawn.subscribe((event) => {
  const { entity } = event;

  const pearlLogic = pearls.find((p) => p.typeId === entity.typeId);
  pearlLogic?.runAfterLaunch(entity);
});

world.afterEvents.entityHurt.subscribe((event) => {
  const attacker = event.damageSource.damagingEntity;
  const equipment = attacker?.getComponent("minecraft:equippable");

  if (equipment && attacker && attacker.typeId === "minecraft:player") {
    const selectedItem = equipment.getEquipment(EquipmentSlot.Mainhand);
    const pearlLogic = pearls.find((p) => p.typeId === selectedItem?.typeId);

    // Run only if the child class has overridden this method
    if (pearlLogic && pearlLogic.hurtEntity !== BasePearl.prototype.hurtEntity) {
      pearlLogic?.hurtEntity(event, attacker);
    }
  }
});
