import React, { useState } from 'react';
import { mobAppImgPath } from './mobile-app-common';
import { LazyImage } from '@repo/ui';


const MobileAppQr: React.FC = () => {
  const [windowOpen, toggleWindow] = useState(false);

  const path = mobAppImgPath(`/assets/landings/mobile-app/qr.png`);

  return (
    <>
      <div
        className="app-landing__qr"
        onClick={() => toggleWindow(true)}
      >
        <LazyImage
          height={300}
          width={300}
          src={path}
          alt='qr'
        />
      </div>
      {/*{windowOpen && (*/}
      {/*  <UIModalPortal*/}
      {/*    identifier="mobile-app-qr"*/}
      {/*    onClose={() => toggleWindow(false)}*/}
      {/*    closeOnEscape*/}
      {/*  >*/}
      {/*    <div className="app-landing__qr-modal">*/}
      {/*      <img*/}
      {/*        height={754}*/}
      {/*        width={754}*/}
      {/*        src={path}*/}
      {/*        alt='qr'*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </UIModalPortal>*/}
      {/*)}*/}
    </>
  );
};

export default MobileAppQr;
