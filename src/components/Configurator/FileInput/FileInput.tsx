import Form from 'react-bootstrap/Form';
import {useCallback, useState} from "react";
import useDimensions from "../../../hooks/useDimensions";

type Props = {
  onChange: any,
}

function returnFileSize(number:number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

function FileInput(props:Props) {
  const { onChange } = props;
  const { screenHeight } = useDimensions();

  const [ selectedFile, setSelectedFile ] = useState<any>();

  const handleChange = (event:any) => {
    const newSelectedFile = event.target.files[0];

    setSelectedFile({
      type: newSelectedFile.type,
      size: returnFileSize(newSelectedFile.size),
      objectURL: URL.createObjectURL(newSelectedFile),
    });
  }

  const handleLoad = useCallback((event:any) => {
    const imageObj:HTMLImageElement = event.target;

    const heightRatio = screenHeight/imageObj.naturalHeight;
    const scaledImageWidth = imageObj.naturalWidth*heightRatio;

    const loadedImage = {
      file: selectedFile,
      width: imageObj.naturalWidth,
      fitWidth: scaledImageWidth,
      height: imageObj.naturalHeight,
      fitHeight: screenHeight,
      aspectRatio: imageObj.naturalWidth/imageObj.naturalHeight,
    };

    onChange(loadedImage);
  }, [ onChange, selectedFile, screenHeight ]);

  return (
    <>
      <Form.Control type="file"
                    size="sm"
                    id="file-input"
                    accept="image/*"
                    onChange={handleChange}
      />

      { selectedFile &&
          <div>
            <div className="text-center">
              <img className="w-50 h-auto mt-3 filter-drop-shadow"
                   src={selectedFile.objectURL}
                   alt={selectedFile.name}
                   onLoad={handleLoad}
              />
            </div>
          </div>
      }
    </>
  );
}

export default FileInput;