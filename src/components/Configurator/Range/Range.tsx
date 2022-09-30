import Form from 'react-bootstrap/Form';
import {useState} from "react";

type Props = {
  label: string,
  min: number,
  max: number,
  initValue: number,
  unit: string,
  onUpdate: any,
};

function RangeSlider(props:Props) {
  const { label, min, max, initValue, unit, onUpdate } = props;

  const [ currentValue, setCurrentValue ] = useState<number>(initValue);

  return (
    <>
      <Form.Label>
        <span className="text-muted">{ label }:</span> { currentValue } { unit }
      </Form.Label>
      <Form.Range defaultValue={initValue}
                  min={min}
                  max={max}
                  onChange={(event) => {
                    setCurrentValue(Number(event.target.value));
                    onUpdate(Number(event.target.value));
                  }}
      />
    </>
  );
}

export default RangeSlider;