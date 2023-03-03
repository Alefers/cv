import React, { memo } from 'react';
import './app-landing-section-phone.scss';
import { mobAppImgPath, MobAppSectionPhoneImage, MobAppSectionPhoneMain } from '../common/mobile-app-common';
import { cn } from '@repo/helpers';


interface AppLandingSectionPhoneProps {
  name: string;
  mainImage: MobAppSectionPhoneMain;
  subImages: MobAppSectionPhoneImage[];
}

const AppLandingSectionPhone: React.FC<AppLandingSectionPhoneProps> = (
  {
    name,
    mainImage,
    subImages,
  }
) => {
  return (
    <div
      className={cn([
        'app-phone',
        `app-phone--${name}`,
      ])}
    >
      <img
        src={mobAppImgPath(`/assets/landings/mobile-app/sections/phone-${name}-main.png`)}
        className="app-phone__main"
        height={mainImage.height}
        width={mainImage.width}
        alt='phone-image'
      />
      <div className="app-phone__inner">
        {subImages.map((item) => (
          <img
            key={item.pos}
            src={mobAppImgPath(`/assets/landings/mobile-app/sections/phone-${name}-sub-${item.img}.png`)}
            className={`app-phone__sub-${item.pos}`}
            alt='phone-image-small'
            height={item.height}
            width={item.width}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(AppLandingSectionPhone);
