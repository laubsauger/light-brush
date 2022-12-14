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
    if (doRender) {
      setDoRender(false);
    } else {
      onEnded();
      return;
    }

    const timerAfter = setTimeout(() => onEnded(), config.blackoutAfterDurationSec * 1000);

    return () => {
      clearTimeout(timerAfter);
    }
  }, [config.blackoutAfterDurationSec, onEnded, doRender ]);


  useEffect(() => {
    onStarted();
    const timerBefore = setTimeout(() => setDoRender(true), config.blackoutBeforeDurationSec * 1000);

    let timerStop:any;

    if (config.image && !config.loop) {
      timerStop = setTimeout(() => { setDoRender(false) }, (config.image?.fitWidth/config.strokeWidth * config.speedMs) + config.blackoutBeforeDurationSec * 1000);
    }

    return () => {
      clearTimeout(timerBefore);
      if (timerStop) {
        clearTimeout(timerStop);
      }
    }
  }, [ config ]);

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
