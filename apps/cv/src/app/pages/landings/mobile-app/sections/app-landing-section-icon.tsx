import React, { useState } from 'react';
import { MobileAppSvg } from '../common/mobile-app-svg';
import { cn } from '@repo/helpers';
import { MobAppSectionIcon } from '../common/mobile-app-common';


interface AppLandingSectionIconProps {
  item: MobAppSectionIcon;
}

const AppLandingSectionIcon: React.FC<AppLandingSectionIconProps> = (
  {
    item,
  }
) => {
  const [timesHovered, updateCount] = useState(0);

  return (
    <div
      className={cn([
        'app-land-section__info-icon',
        `hovered--${timesHovered}`,
      ])}
      onMouseLeave={() => updateCount(timesHovered + 1)}
    >
      <div className="app-land-section__info-icon-svg">
        <MobileAppSvg name={item.icon} suffix />
      </div>
      <div className="app-land-section__info-icon-title">
        <span>
          {item.title}
        </span>
      </div>
    </div>
  );
};

export default AppLandingSectionIcon;