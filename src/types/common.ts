export type PlayerConfig = {
  mode: 'static' | 'image',
  staticColor: any,
  staticDurationSec: number,
  strokeWidth: number,
  image: ImageFile | null,
  viewportWidth: number,
  viewportHeight: number,
  blackoutBeforeDurationSec: number,
  blackoutAfterDurationSec: number,
  speedMs: number,
  countdown: boolean,
  loop: boolean,
}

export type ImageFile = {
  file: {
    type: string,
    size: number,
    objectURL: string,
  },
  width: number,
  fitWidth: number,
  height: number,
  fitHeight: number,
  aspectRatio: number,
}