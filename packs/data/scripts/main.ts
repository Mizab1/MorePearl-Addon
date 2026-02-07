import { Entity, system, world } from "@minecraft/server";
import { BlindnessPearl } from "./pearls/blindnessPearl";
import { GravityPearl } from "./pearls/gravityPearl";
import { SlownessPearl } from "./pearls/slownessPearl";

const pearls = [new BlindnessPearl(), new SlownessPearl(), new GravityPearl()];

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
