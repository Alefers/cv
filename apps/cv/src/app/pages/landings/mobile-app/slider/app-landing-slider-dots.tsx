import React, { useEffect, useState } from 'react';
import './app-landing-slider-dots.scss';


interface Coords {
  x: number;
  y: number;
}

interface Position {
  big: Coords;
  medium: Coords;
}

const posMap: {[key: number]: Position} = {
  1: {
    big: {
      x: 8,
      y: 8.5,
    },
    medium: {
      x: -12.5,
      y: -6.5,
    },
  },
  2: {
    big: {
      x: 11.5,
      y: 3,
    },
    medium: {
      x: -8,
      y: 10,
    },
  },
  3: {
    big: {
      x: -13.5,
      y: -3,
    },
    medium: {
      x: 10,
      y: 5.5,
    },
  },
  4: {
    big: {
      x: 9.5,
      y: -9,
    },
    medium: {
      x: -3.5,
      y: 11,
    },
  },
  5: {
    big: {
      x: -12,
      y: -0.5,
    },
    medium: {
      x: 8,
      y: 8.5,
    },
  },
}

interface AppLandingSliderDotsProps {
  current: number;
}

const AppLandingSliderDots: React.FC<AppLandingSliderDotsProps> = (
  {
    current,
  }
) => {
  const [mediumPos, setMediumPos] = useState(posMap[1].medium);
  const bigPos = posMap[current].big;

  useEffect(() => {
    const timout = setTimeout(() => setMediumPos(posMap[current].medium), 300);

    return () => clearTimeout(timout);
  }, [current]);

  return (
    <>
      <div
        className="app-land-slider-dots"
      >
        <div
          className="app-landing__circle app-landing__circle--large"
          style={{
            transform: `translate(${bigPos.x}em, ${bigPos.y}em)`,
          }}
        />
        <div
          className="app-landing__circle app-landing__circle--medium"
          style={{
            transform: `translate(${mediumPos.x}em, ${mediumPos.y}em)`,
          }}
        />
      </div>
    </>
  );
}

export default AppLandingSliderDots;