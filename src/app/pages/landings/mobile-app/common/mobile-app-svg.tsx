import React from 'react';
import { cn } from '@nxplatform/helpers';


interface MobileAppSvgProps {
  name: string;
  suffix?: boolean;
}

export const MobileAppSvg: React.FC<MobileAppSvgProps> = (
  {
    name,
    suffix,
  }
) => {
  return (
    <svg
      className={cn([
        'app-landing__icon',
        suffix && `app-landing__icon--${name}`,
      ])}
    >
      <use
        href={`/assets/landings/mobile-app/icons/svg_font.svg?V=1#${name}`}
      />
    </svg>
  );
};
