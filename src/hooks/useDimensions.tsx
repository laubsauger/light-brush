import { useState, useEffect } from 'react';

function getDimensions() {
  return {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  };
}

export default function useDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}