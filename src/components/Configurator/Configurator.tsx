import React, {useCallback, useEffect, useState} from 'react';
import {ImageFile, PlayerConfig} from "../../types/common";
import {Col, Tabs, Row, Tab, Card, Form} from "react-bootstrap";
import RangeSlider from "./Range/Range";
import ColorPicker from "./ColorPicker/ColorPicker";
import FileInput from "./FileInput/FileInput";
import useDimensions from "../../hooks/useDimensions";
import styled, {keyframes} from "styled-components";

type Props = {
  onChanged: any,
}

const defaultPlayerConfig:PlayerConfig = {
  mode: 'static',
  staticColor: '#8400db',
  staticDurationSec: 5,
  strokeWidth: 10,
  image: null,
  keepImageAspectRatio: true,
  viewportWidth: 100,
  viewportHeight: 100,
  blackoutBeforeDurationSec: 2,
  blackoutAfterDurationSec: 2,
  playDurationMs: 1000,
  speedMs: 2,
  showCountdown: false,
}


const slideKeyFrames = (imageWidth:number) => keyframes`
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-${imageWidth/2}px, 0, 0);
    }
  `;

const SlideAnimationImg = styled('img')<{imageWidth: number, duration: number}>`
    animation : ${props => slideKeyFrames(props.imageWidth)} ${props => props.duration}s linear;
    animation-iteration-count: infinite;
  `;

function Configurator(props:Props) {
  const { onChanged } = props;
  const { screenWidth, screenHeight } = useDimensions();

  const [ runPreviewSimulation, setRunPreviewSimulation ] = useState<boolean>(false);
  const [ config, setConfig ] = useState<PlayerConfig>(defaultPlayerConfig);


  const handleImageChange = useCallback((newVal:ImageFile) => {
    console.log('handleImageChange', newVal)
    setConfig({ ...config, image: newVal });
  }, [ config ]);

  const handleStaticColorChange = useCallback((newVal:string) => {
    console.log('handleStaticColorChange')
    setConfig({ ...config, staticColor: newVal });
  }, [ config ]);

  const handleStrokeWidthChange = useCallback((newVal:number) => {
    console.log('handleStrokeWidthChange')
    setConfig({ ...config, strokeWidth: newVal });
  }, [ config ]);

  const handleStaticDurationSecChange = useCallback((newVal:number) => {
    console.log('handleStaticDurationSecChange')
    setConfig({ ...config, staticDurationSec: newVal });
  }, [ config ]);

  const handleSpeedChange = useCallback((newSpeedMs:number) => {
    console.log('handleSpeedChange')
    setConfig({ ...config, speedMs: newSpeedMs });
  }, [ config ]);

  const handleBlackoutBeforeChange = useCallback((newVal:number) => {
    console.log('handleBlackoutBeforeChange')
    setConfig({ ...config, blackoutBeforeDurationSec: newVal });
  }, [ config ]);

  const handleBlackoutAfterChange = useCallback((newVal:number) => {
    console.log('handleBlackoutAfterChange')
    setConfig({ ...config, blackoutAfterDurationSec: newVal });
  }, [ config ]);

  const handleShowCountdownChange = useCallback(() => {
    console.log('handleShowCountdownChange', !config.showCountdown)
    setConfig({ ...config, showCountdown: !config.showCountdown });
  }, [ config ]);

  const handleKeepImageAspectRatio = useCallback(() => {
    console.log('handleShowCountdownChange', !config.keepImageAspectRatio)
    setConfig({ ...config, keepImageAspectRatio: !config.keepImageAspectRatio });
  }, [ config ]);

  useEffect(() => {
    console.log('useEffect', config);
    onChanged(config);
  }, [ onChanged, config ]);

  return (
    <div>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header>Mode</Card.Header>
            <Card.Body>
              <Tabs
                defaultActiveKey="static"
                id="justify-tab-example"
                className="mb-3"
                justify
                onSelect={(tabKey) => setConfig({ ...config, mode: tabKey === 'image' ? 'image' : 'static' })}
              >
                <Tab eventKey="static" title="Static">
                  <ColorPicker initValue={defaultPlayerConfig.staticColor}
                               onUpdate={handleStaticColorChange}
                  />
                </Tab>
                <Tab eventKey="image" title="Image">
                  <FileInput onChange={handleImageChange}/>
                  {/*<Form.Switch type="switch"*/}
                  {/*             id="aspectratio-switch"*/}
                  {/*             label="keep aspect ratio"*/}
                  {/*             checked={config.keepImageAspectRatio}*/}
                  {/*             onChange={handleKeepImageAspectRatio}*/}
                  {/*             className="mt-3"*/}
                  {/*/>*/}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header>Options</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <div className="mb-2"><span className="text-muted">mode:</span> { config.mode }</div>
                </Col>
                <hr/>
              </Row>

              <Row>
                <Col>
                  <div className="mb-2"><span className="text-muted">screen width:</span> { screenWidth }</div>
                  <div className="mb-2"><span className="text-muted">screen height:</span> { screenHeight }</div>
                  <div className="mb-2"><span className="text-muted">screen ar:</span> { (screenWidth/screenHeight).toFixed(3) }</div>
                </Col>
                { config.mode === 'image' && config.image &&
                  <Col>
                    <div className="mb-2"><span className="text-muted">img width:</span> { config.image.width }</div>
                    <div className="mb-2"><span className="text-muted">img height:</span> { config.image.height }</div>
                    <div className="mb-2"><span className="text-muted">fit width:</span> { Math.round(config.image.fitWidth) }</div>
                    <div className="mb-2"><span className="text-muted">fit height:</span> { config.image.fitHeight }</div>
                    <div className="mb-2"><span className="text-muted">img ar:</span> { (config.image.aspectRatio).toFixed(3) }</div>
                  </Col>
                }
                <hr/>
              </Row>

              {/*<div>viewport/stroke size</div>*/}
              <Row>
                <Col xs={12}>
                  <RangeSlider label={'stroke width'}
                               min={1}
                               max={screenWidth}
                               initValue={defaultPlayerConfig.strokeWidth}
                               unit={'px'}
                               onUpdate={handleStrokeWidthChange}
                  />
                </Col>
                <hr/>
              </Row>

              <div>play</div>
              <Row>
                { config.mode === 'static' ?
                  <>
                    <Col xs={12}>
                      <RangeSlider label={'duration'}
                                   min={0}
                                   max={120}
                                   initValue={defaultPlayerConfig.staticDurationSec}
                                   unit={'sec'}
                                   onUpdate={handleStaticDurationSecChange}
                      />
                    </Col>
                  </>
                  :
                  <>
                    <Col xs={6}>
                      <RangeSlider label={'speed'}
                                   min={0}
                                   max={1200}
                                   initValue={defaultPlayerConfig.speedMs}
                                   unit={'ms'}
                                   onUpdate={handleSpeedChange}
                      />
                    </Col>
                    { config.image &&
                        <Col xs={6}>
                          <span className="text-muted">duration:</span> { ((config.image?.fitWidth/config.strokeWidth * config.speedMs) / 1000).toFixed(2) } sec
                        </Col>
                    }
                  </>
                }
                <hr/>
              </Row>

              <div>blackout</div>
              <Row>
                <Col xs={6}>
                  <RangeSlider label={'before'}
                               min={0}
                               max={30}
                               initValue={defaultPlayerConfig.blackoutBeforeDurationSec}
                               unit={'sec'}
                               onUpdate={handleBlackoutBeforeChange}
                  />
                </Col>
                <Col xs={6}>
                  <RangeSlider label={'after'}
                               min={0}
                               max={30}
                               initValue={defaultPlayerConfig.blackoutAfterDurationSec}
                               unit={'sec'}
                               onUpdate={handleBlackoutAfterChange}
                  />
                </Col>
                <hr/>
              </Row>
              <Form.Switch type="switch"
                           id="countdown-switch"
                           label="Show countdown"
                           checked={config.showCountdown}
                           onChange={handleShowCountdownChange}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header>Preview</Card.Header>
            <Card.Body>
              <Form.Switch type="switch"
                           id="simulate-switch"
                           label="Simulate"
                           checked={runPreviewSimulation}
                           onChange={() => setRunPreviewSimulation(!runPreviewSimulation)}
              />

              <div className="d-flex justify-content-center align-items-center">
                <div style={{ width: screenWidth / 2, height: screenHeight / 2 }}>
                  <div className="w-100 h-100 rounded border-1 border filter-drop-shadow d-flex justify-content-center" style={{ background: "#000" }}>
                    <div className="h-100 overflow-hidden" style={{ width: (config.strokeWidth / 2) }}>
                      { config.mode === 'image' && config.image ?
                        <div className="position-relative h-100">
                          { runPreviewSimulation ?
                            <SlideAnimationImg duration={(config.image?.fitWidth/config.strokeWidth * config.speedMs) / 1000}
                                               imageWidth={config.image.fitWidth}
                                               src={config.image.file.objectURL}
                                               alt="img"
                                               style={{ height: '100%' }}
                            />
                            :
                            <img src={config.image.file.objectURL}
                                 alt="img"
                                 style={{ height: '100%' }}
                            />
                          }
                        </div>
                        :
                        null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

//.image-slide {
//  animation: slide 60s linear infinite;
//}

// @keyframes slide{
//   0% {
//     transform: translate3d(0, 0, 0);
//   }
//   100% {
//     transform: translate3d(-1692px, 0, 0);
// }
// }

export default Configurator;
