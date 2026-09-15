"use client";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { UnsignedByteType } from "three";

/** Desktop only, and in its own chunk: the composer and its passes are the
 *  heaviest thing in the hero, and a phone gets the emissive materials alone.
 *
 *  The buffers are 8 bit on purpose. A half float chain at retina width, about
 *  3000 device pixels and up, comes back clipped to a few hundred pixels on
 *  Chrome's Metal backend, and it fails silently rather than throwing. The
 *  scene is tone mapped before it reaches the composer and every shader
 *  dithers, so the gradients survive the shallower buffer. */
export default function Effects() {
  return (
    <EffectComposer
      multisampling={4}
      enableNormalPass={false}
      frameBufferType={UnsignedByteType}
    >
      <Bloom
        mipmapBlur
        luminanceThreshold={0.6}
        luminanceSmoothing={0.28}
        intensity={0.95}
        kernelSize={KernelSize.LARGE}
      />
      <Vignette offset={0.22} darkness={0.72} blendFunction={BlendFunction.NORMAL} />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.32} />
    </EffectComposer>
  );
}
