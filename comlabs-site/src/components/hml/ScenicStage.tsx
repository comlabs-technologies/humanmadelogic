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
 * A backdrop field built from the four hero studies sits behind a set of
 * overlapping windows cut from the architectural photography. Everything here
 * is a WebGL surface: the field is what the shader plays across, and the
 * windows are the same photography sunk towards black so only edge and shadow
 * survive.
 *
 * Draw order is explicit. Every plane lives at z = 0 with depth testing off,
 * so `layer` is what decides which photograph covers which — and it mirrors
 * the DOM stacking exactly, which is what keeps the non-WebGL fallback
 * identical to the shader version.
 */
export function ScenicStage() {
  return (
    <div className="relative w-full overflow-hidden rounded-[18px]">
      {/* Backdrop field — four studies, edge to edge, no seams. */}
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

      {/* Washes the field back so the windows and the typography stay dominant. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(242,240,235,0.42) 0%, rgba(242,240,235,0.16) 38%, rgba(242,240,235,0.5) 100%)',
        }}
      />

      {/* Windows. */}
      <div className="relative z-10 aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
        {/* Narrow window, furthest back. */}
        <div className="absolute right-[3%] top-[12%] z-10 hidden w-[13%] rounded-[12px] shadow-[0_30px_70px_-32px_rgba(10,10,10,0.75)] md:block">
          <ShaderImage
            id={media.pillar.id}
            asset={media.pillar}
            layer={10}
            sizes="14vw"
            className="w-full"
          />
        </div>

        {/* Primary window. */}
        <div className="absolute left-[5%] top-[7%] z-20 w-[74%] rounded-[12px] shadow-[0_44px_90px_-38px_rgba(10,10,10,0.8)] md:w-[70%]">
          <ShaderImage
            id={media.monument.id}
            asset={media.monument}
            layer={20}
            sizes="(max-width: 768px) 74vw, 62vw"
            className="w-full"
          />
        </div>

        {/* Second window, crossing the primary one's lower-right corner. */}
        <div className="absolute bottom-[4%] right-[2%] z-30 w-[62%] rounded-[12px] shadow-[0_40px_84px_-36px_rgba(10,10,10,0.78)] md:w-[48%]">
          <ShaderImage
            id={media.aperture.id}
            asset={media.aperture}
            layer={30}
            sizes="(max-width: 768px) 62vw, 44vw"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
