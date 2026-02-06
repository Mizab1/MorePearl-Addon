import { TicksPerSecond } from "@minecraft/server";

export default {
  BLINDNESS_PEARL: {
    PEARL_ID: "more_pearl:blindness_pearl",
    IMPACT_DISTANT: 15,
    EFFECT_TIME: TicksPerSecond * 5,
  },

  // Global
  BUFFER_DISTANCE: 2.1,
} as const;
