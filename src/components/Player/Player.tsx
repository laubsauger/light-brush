import React, {useCallback, useEffect} from 'react';
import {PlayerConfig} from "../../types/common";

type Props = {
  config: PlayerConfig,
  onStarted: any,
  onEnded: any,
}

function Player(props:Props) {
  const { config, onStarted, onEnded } = props;

  const handleStopTap = useCallback(() => {
    onEnded();
  }, [onEnded]);

  useEffect(() => {
    onStarted();
  }, [onStarted])

  return (
    <div className="Player" onClick={handleStopTap}>
      Player
    </div>
  );
}

export default Player;
