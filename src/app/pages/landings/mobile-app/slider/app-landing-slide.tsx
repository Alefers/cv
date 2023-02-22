import React, { useEffect, useState } from 'react';
import './app-landing-slide.styl';
import { cn } from '@nxplatform/helpers';
import { Subscription, timer } from 'rxjs';
import { generateWebpPath } from '@nxplatform/platform-settings';
import { AppLandSlideStatus } from '../common/mobile-app-common';


export interface MobileAppLandingSliderItemProps {
  id: number;
  state: number;
  name: string;
  subImages: string[];
}

export const getAppLandImagePath = (path: string): string => generateWebpPath({
  path,
  webpSupport: window.webpSupport,
})

const MobileAppLandingSliderItem: React.FC<MobileAppLandingSliderItemProps> = (
  {
    id,
    state,
    name,
    subImages,
  }
) => {
  const [currentState, changeState] = useState(AppLandSlideStatus.invisible);

  useEffect(() => {
    const subscription = new Subscription();

    if (state === AppLandSlideStatus.ready) {
      subscription.add(
        timer(200)
        .subscribe(() => changeState(AppLandSlideStatus.ready)),
      );
    }

    if (state === AppLandSlideStatus.hide) {
      changeState(AppLandSlideStatus.hide);
      subscription.add(
        timer(200)
        .subscribe(() => changeState(AppLandSlideStatus.invisible)),
      );
    }

    return () => subscription.unsubscribe();
  }, [state]);

  return (
    <div
      className={cn([
        'app-land-slider-item',
        name,
        currentState === AppLandSlideStatus.ready && 'app-land-slider-item--ready',
        currentState === AppLandSlideStatus.hide && 'app-land-slider-item--hidden',
      ])}
    >
      <img
        src={getAppLandImagePath(`/assets/landings/mobile-app/slide${id}-main.png`)}
        className="app-land-slider-item__main-image"
        alt='slide-image'
      />
      {subImages.map((num) => (
        <img
          key={num}
          src={getAppLandImagePath(`/assets/landings/mobile-app/slide${id}-secondary-${num}.png`)}
          className={`app-land-slider-item__sub-image-${num}`}
          alt='slide-second'
        />
      ))}
    </div>
  );
}

export default MobileAppLandingSliderItem;
