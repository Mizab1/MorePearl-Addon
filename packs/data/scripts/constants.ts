import { TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export default {
  BLINDNESS_PEARL: {
    PEARL_ID: "more_pearl:blindness_pearl",
    IMPACT_DISTANT: 15,
    EFFECT_TIME: TicksPerSecond * 5,
    EFFECT_NAME: MinecraftEffectTypes.Blindness,
    PARTICLE_NAME: "more_pearl:blindness_particle",
  },

  SLOWNESS_PEARL: {
    PEARL_ID: "more_pearl:slowness_pearl",
    IMPACT_DISTANT: 15,
    EFFECT_TIME: TicksPerSecond * 3,
    EFFECT_NAME: MinecraftEffectTypes.Slowness,
    PARTICLE_NAME: "more_pearl:slowness_particle",
  },

  // Global
  BUFFER_DISTANCE: 2.1,
} as const;
