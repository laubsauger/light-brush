import React, {useState} from 'react';
import './App.scss';
import Configurator from "../Configurator/Configurator";
import Player from "../Player/Player";
import { PlayerConfig } from "../../types/common";
import {Button, Col, Container, Row} from "react-bootstrap";

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
              { (config && ((config.mode === 'static' && config.staticColor) || (config.mode === 'image' && config.image))) &&
                <div className="d-grid gap-2 mt-3">
                  <Button variant="primary"
                          onClick={() => {
                            setPlay(true);
                          }}
                          disabled={config?.mode === 'image' && !config?.image}>
                    Start
                  </Button>
                </div>
              }
            </Col>

            <Col xs={6} className="mt-3 d-flex justify-content-end align-items-center">
              <Button variant="outline-secondary"  onClick={() => toggleFullscreen()}>
                Fullscreen
              </Button>
            </Col>
          </Row>
        </Container>

        { play && config ?
          <Player config={config}
                  onStarted={() => console.log('onStart')}
                  onEnded={() => setPlay(false)}
          />
          : null
        }
      </main>
    </div>
  );
}

export default App;
