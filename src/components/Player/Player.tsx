import React, {useCallback, useEffect, useState} from 'react';
import {PlayerConfig} from "../../types/common";
import SlideAnimation from "../styled/SlideAnimation";

type Props = {
  config: PlayerConfig,
  onStarted: any,
  onEnded: any,
}

function Player(props:Props) {
  const { config, onStarted, onEnded } = props;

  const [ doRender, setDoRender ] = useState(false);

  // wait for configured time, then stop render
  const handleStopTap = useCallback(() => {
    setDoRender(false);
    const timerAfter = setTimeout(() => onEnded(), config.blackoutAfterDurationSec * 1000);

    return () => {
      clearTimeout(timerAfter);
    }
  }, [config.blackoutAfterDurationSec, onEnded ]);

  // wait for configured time, then start render
  useEffect(() => {
    const timerBefore = setTimeout(() => setDoRender(true), config.blackoutBeforeDurationSec * 1000);
    let timerStop:any;

    if (config.image && !config.loop) {
      timerStop = setTimeout(handleStopTap, (config.image?.fitWidth/config.strokeWidth * config.speedMs) + config.blackoutBeforeDurationSec * 1000);
    }

    return () => {
      clearTimeout(timerBefore);

      if (timerStop) {
        clearTimeout(timerStop);
      }
    }
  }, [ config, handleStopTap ]);

  useEffect(() => {
    onStarted();
  }, [ onStarted ]);


  //@todo: for single-run/non-looped stuff: add timer for us to know when the animation is done and we should fade to black and then kill the player

  return (
    <div className="Player w-100 h-100 position-fixed d-flex justify-content-center align-items-center"
         style={{ background: "#000", top: 0, bottom: 0, left: 0, right: 0, zIndex: 99999, }}
         onClick={handleStopTap}
    >
      { doRender &&
        <div className="h-100 overflow-hidden" style={{ width: (config.strokeWidth) }}>
          { config.mode === 'image' && config.image ?
            <div className="position-relative h-100">
              <SlideAnimation duration={(config.image?.fitWidth/config.strokeWidth * config.speedMs) / 1000}
                              strokeWidth={config.strokeWidth}
                              imageWidth={config.image.fitWidth}
                              className="d-flex h-100"
              >
                <img src={config.image.file.objectURL} alt="img" className="h-100"
                />
                <img src={config.image.file.objectURL} alt="img" className="h-100"
                />
              </SlideAnimation>
            </div>
            :
            null // @todo: solid/gradient implementation
          }
        </div>
      }
    </div>
  );
}

export default Player;
