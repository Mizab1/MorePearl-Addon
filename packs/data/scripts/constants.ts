import { TicksPerSecond } from "@minecraft/server";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export default {
  BLINDNESS_PEARL: {
    PEARL_ID: "more_pearl:blindness_pearl",
    IMPACT_DISTANCE: 15,
    EFFECT_TIME: TicksPerSecond * 5,
    EFFECT_NAME: MinecraftEffectTypes.Blindness,
    PARTICLE_NAME: "more_pearl:blindness_particle",
  },

  SLOWNESS_PEARL: {
    PEARL_ID: "more_pearl:slowness_pearl",
    IMPACT_DISTANCE: 15,
    EFFECT_TIME: TicksPerSecond * 3,
    EFFECT_NAME: MinecraftEffectTypes.Slowness,
    PARTICLE_NAME: "more_pearl:slowness_particle",
  },

  GRAVITY_PEARL: {
    PEARL_ID: "more_pearl:gravity_pearl",
    IMPACT_DISTANCE: 8,
    STRENGTH: 0.2,
    PARTICLE_NAME: "more_pearl:gravity_particle",
  },

  SWAP_PEARL: {
    PEARL_ID: "more_pearl:swap_pearl",
    MIN_DISTANCE: 1,
    IMPACT_DISTANCE: 8,
    PARTICLE_NAME: "more_pearl:swap_particle",
  },

  TARGET_PEARL: {
    PEARL_ID: "more_pearl:target_pearl",
    PARTICLE_NAME: "more_pearl:swap_particle",
  },

  // Global
  BUFFER_DISTANCE: 3,
  OWNER_TAG: "owner",
  ATTACKED_TAG: "attacked",

  // Color
  COLOR: {
    Red: "\u00A7c",
    Green: "\u00A7a",
    Yellow: "\u00A7e",
    White: "\u00A7f",
    Bold: "\u00A7l",
    Reset: "\u00A7r",
  },
} as const;
