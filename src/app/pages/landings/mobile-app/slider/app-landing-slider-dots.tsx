import React, { useEffect, useState } from 'react';
import './app-landing-slider-dots.styl';
import { Subscription, timer } from 'rxjs';


const posMap = {
  1: {
    big: {
      x1: 8,
      y1: 8.5,
    },
    medium: {
      x1: -12.5,
      y1: -6.5,
    },
  },
  2: {
    big: {
      x1: 11.5,
      y1: 3,
    },
    medium: {
      x1: -8,
      y1: 10,
    },
  },
  3: {
    big: {
      x1: -13.5,
      y1: -3,
    },
    medium: {
      x1: 10,
      y1: 5.5,
    },
  },
  4: {
    big: {
      x1: 9.5,
      y1: -9,
    },
    medium: {
      x1: -3.5,
      y1: 11,
    },
  },
  5: {
    big: {
      x1: -12,
      y1: -0.5,
    },
    medium: {
      x1: 8,
      y1: 8.5,
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
    const subscription = new Subscription();

    subscription.add(
      timer(300)
      .subscribe(() => setMediumPos(posMap[current].medium)),
    );

    return () => subscription.unsubscribe();
  }, [current]);

  return (
    <>
      <div
        className="app-land-slider-dots"
      >
        <div
          className="app-landing__circle app-landing__circle--large"
          style={{
            transform: `translate(${bigPos.x1}em, ${bigPos.y1}em)`,
          }}
        />
        <div
          className="app-landing__circle app-landing__circle--medium"
          style={{
            transform: `translate(${mediumPos.x1}em, ${mediumPos.y1}em)`,
          }}
        />
      </div>
    </>
  );
}

export default AppLandingSliderDots;