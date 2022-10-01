import React, { useState } from 'react';
import './App.scss';
import Configurator from "../Configurator/Configurator";
import Player from "../Player/Player";
import { PlayerConfig } from "../../types/common";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const toggleFullscreen = () => {
  const el = window.document.documentElement;

  if (!window.document.fullscreenElement) {
    el.requestFullscreen().then((ev) => {
      console.log('requestFullscreen', ev);
    }).catch((err) => {
      alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
    });
  } else {
    window.document.exitFullscreen().then((ev) => {
      console.log('exitFullscreen', ev);
    }).catch((err) => {
      alert(`Error attempting to exit fullscreen mode: ${err.message} (${err.name})`);
    });
  }
}

function App() {
  const [ config, setConfig ] = useState<PlayerConfig>();
  const [ play, setPlay ] = useState<boolean>(false);

  return (
    <div className="App">
      <header>
        Light Brush
      </header>

      <main>
        <Container fluid className="mb-3">
          <Configurator onChanged={(newConfig:PlayerConfig) => setConfig(newConfig)}/>

          <Row>
            <Col xs={6}>
              <div className="d-grid gap-2 mt-3">
                <Button variant="primary"
                        onClick={() => setPlay(true)}
                        disabled={!config?.image && !config?.staticColor}>
                  Start
                </Button>
              </div>
            </Col>

            <Col xs={6} className="mt-3 d-flex justify-content-end align-items-center">
              <Form.Switch type="switch"
                           id="fullscreen-switch"
                           label="Fullscreen"
                           onChange={() => toggleFullscreen()}
              />
            </Col>
          </Row>

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
