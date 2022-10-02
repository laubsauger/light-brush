import {Card, Form} from "react-bootstrap";
import SlideAnimation from "../../styled/SlideAnimation";
import React, {useState} from "react";
import {PlayerConfig} from "../../../types/common";
import useDimensions from "../../../hooks/useDimensions";

type Props = {
  config: PlayerConfig,
}

function Preview(props:Props) {
  const { config } = props;
  const { screenWidth, screenHeight } = useDimensions();
  const [ runPreviewSimulation, setRunPreviewSimulation ] = useState<boolean>(false);

  return (
    <Card>
      <Card.Header>Preview</Card.Header>
      <Card.Body>
        <Form.Switch type="switch"
                     id="simulate-switch"
                     label="Simulate"
                     disabled={config.mode === 'image' && !config.image}
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
                      <div className="position-relative h-100">
                        <SlideAnimation duration={(config.image?.fitWidth/config.strokeWidth * config.speedMs) / 1000}
                                        strokeWidth={config.strokeWidth}
                                        imageWidth={config.image.fitWidth/2}
                                        className="d-flex h-100"
                        >
                          <img src={config.image.file.objectURL} alt="img" className="h-100"
                          />
                          <img src={config.image.file.objectURL} alt="img" className="h-100"
                          />
                        </SlideAnimation>
                      </div>
                      :
                      <img src={config.image.file.objectURL} alt="img" className="h-100"
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
  );
}

export default Preview;