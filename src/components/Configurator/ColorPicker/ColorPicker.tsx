import Form from 'react-bootstrap/Form';
import {useState} from "react";

type Props = {
  initValue: string,
  onUpdate: any,
};

function ColorPicker(props:Props) {
  const { initValue, onUpdate } = props;

  const [ currentValue, setCurrentValue ] = useState<string>(initValue);

  return (
    <>
      <Form.Label htmlFor="color-input">Color: { currentValue }</Form.Label>
      <Form.Control
        title="Choose your color"
        type="color"
        id="color-input"
        defaultValue={initValue}
        onChange={(event) => {
          setCurrentValue(event.target.value);
          onUpdate(event.target.value);
        }}
      />
    </>
  );
}

export default ColorPicker;