import type { IUniform } from "three";
import { FOG_DENSITY, PALETTE, SUN_DIR } from "./world";

export type CommonUniforms = Record<string, IUniform>;

/** One set of uniform holders, spread into every material, so the sun, the
 *  haze and the clock are written once per frame and read everywhere. */
export function createCommonUniforms() {
  return {
    uTime: { value: 0 },
    uIgnition: { value: 0 },
    uFogDensity: { value: FOG_DENSITY },
    uSunDir: { value: SUN_DIR.clone() },
    uSunColor: { value: PALETTE.sun.clone() },
    uZenith: { value: PALETTE.zenith.clone() },
    uHorizon: { value: PALETTE.horizon.clone() },
    uHorizonCool: { value: PALETTE.horizonCool.clone() },
    uHaze: { value: PALETTE.haze.clone() },
  };
}
