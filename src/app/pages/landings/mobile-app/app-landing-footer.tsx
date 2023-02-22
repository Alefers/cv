import React from 'react';
import './app-landing-footer.scss';
import { __ } from '@cv/helpers';
import MobileLandingAppIcons from './lottie/app-icons';
import MobileAppQr from './common/mobile-app-qr';
import { mobAppImgPath } from './common/mobile-app-common';


export const MobileAppLandingFooter: React.FC = () => {
  return (
    <div className="app-land-footer">
      <div className="app-land-footer__image">
        <img
          src={mobAppImgPath('/assets/landings/mobile-app/bottom.png')}
          height={636}
          width={551}
          alt='bottom'
        />
      </div>
      <div className="app-land-footer__info">
        <div className="app-land-footer__info-inner">
          <h2>
            {__('App landing_._Bottom_._Download Now')}
          </h2>
          <div className="app-land-footer__info-text">
            <span>
              {__('App landing_._Bottom_._Bottom text')}
            </span>
          </div>
          <MobileLandingAppIcons />
          <MobileAppQr />
        </div>
      </div>
    </div>
  );
};
