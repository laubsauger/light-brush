import React from 'react';
import {PlayerConfig} from "../../types/common";

type Props = {
  config: PlayerConfig,
  onStarted: any,
  onEnded: any,
}

function Player(props:Props) {
  const { config, onStarted, onEnded } = props;

  return (
    <div className="Player">
      Player
    </div>
  );
}

export default Player;
