'use client';

import { media } from '@/config/media';
import { ShaderImage } from './ShaderImage';

const FIELD = [
  media.stageFieldOne,
  media.stageFieldTwo,
  media.stageFieldThree,
  media.stageFieldFour,
];

/**
 * The scenic stage.
 *
 * A shader-driven field fills the background — the four hero studies, washed
 * back until they read as one painterly ground rather than four cards. The
 * scenic photography then sits on that ground as a set of overlapping
 * windows, each keeping its own photographic grade.
 *
 * Draw order is explicit. Every plane sits at z = 0 with depth testing off,
 * so `layer` is what decides which photograph covers which, and it mirrors
 * the DOM stacking so the non-WebGL fallback matches the shader version.
 */
export function ScenicStage() {
  return (
    <div className="relative w-full overflow-hidden rounded-[18px] bg-obsidian/[0.04]">
      {/* Shader field, filling the background. */}
      <div aria-hidden="true" className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4">
        {FIELD.map((asset, index) => (
          <ShaderImage
            key={asset.id}
            id={asset.id}
            asset={asset}
            layer={0}
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={index < 2}
            className="h-full w-full"
            style={{ aspectRatio: 'auto' }}
          />
        ))}
      </div>

      {/* Holds the field back so the windows read as the subject. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(242,240,235,0.5) 0%, rgba(242,240,235,0.2) 40%, rgba(242,240,235,0.55) 100%)',
        }}
      />

      {/* Windows: the scenic photography, at its own grade. */}
      <div className="relative z-10 aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
        {/* Primary window — the dunes. */}
        <div className="absolute left-[5%] top-[7%] z-20 w-[76%] rounded-[12px] shadow-[0_44px_90px_-38px_rgba(20,20,18,0.6)] md:w-[70%]">
          <ShaderImage
            id={media.belief.id}
            asset={media.belief}
            layer={20}
            priority
            sizes="(max-width: 768px) 76vw, 62vw"
            className="w-full"
          />
        </div>

        {/* Second window, crossing the primary one's lower-right corner. */}
        <div className="absolute bottom-[5%] right-[2%] z-30 w-[64%] rounded-[12px] shadow-[0_40px_84px_-36px_rgba(20,20,18,0.58)] md:w-[48%]">
          <ShaderImage
            id={`${media.terrain.id}-stage`}
            asset={media.terrain}
            layer={30}
            sizes="(max-width: 768px) 64vw, 44vw"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
