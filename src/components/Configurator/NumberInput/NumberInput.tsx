import Form from 'react-bootstrap/Form';
import {useCallback, useState} from "react";
import {Button, Col, InputGroup, Row} from "react-bootstrap";

type Props = {
  label: string,
  min: number,
  max: number,
  initValue: number,
  unit: string,
  onUpdate: any,
};

function NumberInput(props:Props) {
  const { label, min, max, initValue, unit, onUpdate } = props;

  const [ currentValue, setCurrentValue ] = useState<number>(initValue);

  const handleChange = useCallback((newVal:number) => {
    let limitedNewVal = newVal;

    if (newVal < min) {
      limitedNewVal = min;
    }

    if (newVal > max) {
      limitedNewVal = max;
    }

    setCurrentValue(limitedNewVal);
    onUpdate(limitedNewVal);
  }, [ setCurrentValue, onUpdate, max, min ]);

  return (
    <Row className="align-items-center">
      <Col xs={4} sm={7} md={8} lg={8} className="mb-2 mb-sm-0">
        <Form.Label htmlFor={`input-number-${label}`} className="mb-0 text-muted">{ label }</Form.Label>
      </Col>
      <Col xs={8} sm={5} md={4} lg={4} style={{ minWidth: '180px' }}>
        <InputGroup style={{ minWidth: '180px' }}>
          <Button variant="outline-primary"
                  onClick={() => handleChange(currentValue - 1)}
                  disabled={currentValue - 1 < min}
          >
            -
          </Button>
          <Form.Control type="number"
                        className="bg-black font-weight-bold text-center font-monospace"
                        name={`input-number-${label}`}
                        id={`input-number-${label}`}
                        aria-label={`input-number-${label}`}
                        value={currentValue}
                        min={min}
                        max={max}
                        onChange={(event) => {
                          handleChange(Number(event.target.value));
                        }}
          />
          <InputGroup.Text className="font-monospace justify-content-center" style={{ minWidth: "55px" }}>{ unit }</InputGroup.Text>
          <Button variant="outline-primary"
                  onClick={() => handleChange(currentValue + 1)}
                  disabled={currentValue + 1 > max}
          >
            +
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default NumberInput;