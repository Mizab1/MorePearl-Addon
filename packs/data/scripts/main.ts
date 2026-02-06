import { system, world } from "@minecraft/server";
import constants from "./constants";
import { BlindnessPearl } from "./pearls/blindness_pearl";
import { SlownessPearl } from "./pearls/slowness_pearl";

const blindnessPearl = new BlindnessPearl();
const slownessPearl = new SlownessPearl();

system.runInterval(() => {
  blindnessPearl.tick();
  slownessPearl.tick();
}, 1);

world.afterEvents.entitySpawn.subscribe((event) => {
  const { entity: pearl } = event;

  switch (pearl.typeId) {
    case constants.BLINDNESS_PEARL.PEARL_ID:
      blindnessPearl.runAfterLaunch(pearl);
      break;
    case constants.SLOWNESS_PEARL.PEARL_ID:
      slownessPearl.runAfterLaunch(pearl);
      break;
  }
});
