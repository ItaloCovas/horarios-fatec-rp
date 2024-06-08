import { useState, useEffect } from 'react';

export function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once to set the initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
