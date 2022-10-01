export type PlayerConfig = {
  mode: 'static' | 'image',
  staticColor: any,
  staticDurationSec: number,
  strokeWidth: number,
  image: ImageFile | null,
  keepImageAspectRatio: boolean,
  viewportWidth: number,
  viewportHeight: number,
  blackoutBeforeDurationSec: number,
  blackoutAfterDurationSec: number,
  speedMs: number,
  showCountdown: boolean,
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