import React, {useState} from 'react';
import './App.scss';
import Configurator from "../Configurator/Configurator";
import Player from "../Player/Player";
import {PlayerConfig} from "../../types/common";
import {Button, Col, Container, Row} from "react-bootstrap";


function App() {
  const [ config, setConfig ] = useState<PlayerConfig>();
  const [ play, setPlay ] = useState<boolean>(false);

  return (
    <div className="App">
      {/*<header>*/}
      {/*  Light Brush*/}
      {/*</header>*/}

      <main>
        <Container fluid>
          <Configurator onChanged={(newConfig:PlayerConfig) => setConfig(newConfig)}/>

          <div className="d-grid gap-2 mt-3">
            <Button variant="primary"
                    onClick={() => setPlay(true)}
                    disabled={!config?.image && !config?.staticColor}>
              Start
            </Button>
          </div>

          { play && config ?
            <Player config={config}
                    onStarted={() => console.log('onStart')}
                    onEnded={() => setPlay(false)}
            />
            : null
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
