import React from 'react';
import './mobile-app-landing.scss';
import './mobile-app-landing-defaults.scss';
import MobileAppLandingSlider from './slider/mobile-app-landing-slider';
import { AppLandingDecorSet } from './common/app-landing-decor-set';
import { MobileAppLandingFooter } from './app-landing-footer';
import MobileAppQr from './common/mobile-app-qr';
import AppLandingSections from './sections/app-landing-sections';
import { __ } from '@cv/helpers';
import { LazyImage } from '@cv/ui';


const MobileAppLanding: React.FC = () => {
  return (
    <div className="app-landing">
      <div className="app-landing__content">
        <div className="app-landing__banner">
          <h1>
            {__('App landing_._Banner_._Landing created only by css animations')}
          </h1>
          <div className="app-landing__banner-inner">
            <div className="app-landing__banner-text">
              {__('App landing_._Banner_._Currently only desktop version, mobile on the way')}
            </div>
            <MobileAppQr />
          </div>
          <div className="app-landing__banner-images">
            <AppLandingDecorSet />
            <LazyImage
              height={740}
              width={580}
              src="/assets/landings/mobile-app/banner-image.png"
              alt='banner-image'
            />
          </div>
        </div>
      </div>
      <div className="app-landing__slider">
        <div className="app-landing__content">
          <MobileAppLandingSlider />
        </div>
        <div className="app-landing__slider-figure-left" />
        <div className="app-landing__slider-figure-right" />
      </div>
      <AppLandingSections />
      <MobileAppLandingFooter />
    </div>
  );
}

export default MobileAppLanding;
