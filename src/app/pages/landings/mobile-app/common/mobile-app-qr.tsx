import React, { useState } from 'react';
import { LazyImage, UIModalPortal } from '@nxplatform/platform-common';
import { mobAppImgPath } from './mobile-app-common';


const MobileAppQr: React.FC = () => {
  const [windowOpen, toggleWindow] = useState(false);

  const path = mobAppImgPath(`/assets/landings/mobile-app/qr.jpg`);

  return (
    <>
      <div
        className="app-landing__qr"
        onClick={() => toggleWindow(true)}
      >
        <LazyImage
          height={754}
          width={754}
          src={path}
          alt='qr'
        />
      </div>
      {windowOpen && (
        <UIModalPortal
          identifier="mobile-app-qr"
          onClose={() => toggleWindow(false)}
          closeOnEscape
        >
          <div className="app-landing__qr-modal">
            <img
              height={754}
              width={754}
              src={path}
              alt='qr'
            />
          </div>
        </UIModalPortal>
      )}
    </>
  );
};

export default MobileAppQr;
