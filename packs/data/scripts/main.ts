import { system, world } from "@minecraft/server";
import constants from "./constants";
import { BlindnessPearl } from "./pearls/blindness_pearl";

const blindnessPearl = new BlindnessPearl();

system.runInterval(() => {
  blindnessPearl.tick();
}, 1);

world.afterEvents.entitySpawn.subscribe((event) => {
  const { entity: pearl } = event;

  switch (pearl.typeId) {
    case constants.BLINDNESS_PEARL.PEARL_ID:
      blindnessPearl.runAfterLaunch(pearl);
      break;
  }
});
