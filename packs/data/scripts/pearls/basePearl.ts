import { Entity, Vector3 } from "@minecraft/server";
import { setOwner } from "../utils/pearlUtils";

export abstract class BasePearl {
  constructor(
    public readonly typeId: string,
    protected bufferDistance: number,
  ) {
    this.typeId = typeId;
    this.bufferDistance = bufferDistance;
  }

  tick(pearls: Entity[]) {
    for (const pearl of pearls) {
      const ray = pearl.dimension.getBlockFromRay(pearl.location, pearl.getVelocity(), {
        maxDistance: this.bufferDistance,
        includePassableBlocks: false,
      });

      if (ray) {
        this.onImpact(pearl, ray.block.location);
        pearl.remove();
      }
    }
  }

  runAfterLaunch(pearl: Entity) {
    setOwner(pearl);
  }

  protected abstract onImpact(pearl: Entity, impactLocation: Vector3): void;
}
