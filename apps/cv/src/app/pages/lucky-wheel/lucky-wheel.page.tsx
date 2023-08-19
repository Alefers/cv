import type { FC } from 'react';
import s from './lucky-wheel.module.scss';
import { __, cn } from '@repo/helpers';


const LuckyWheelPage: FC = () => {
  const sectors = [0, 1, 2, 3, 4];

  const getSectorTransform = (idx: number): string => {
    const angle = 360 / sectors.length;
    return [
      `rotate(${angle * idx}deg)`,
    ].join(', ');
  }

  return (
    <div className={s.luckyWheel}>
      <h1 className="heading heading--h1">
        {__('Default_._Heading_._Lucky Wheel')}
      </h1>
      <div className={s.wheelWrapper}>
        <div className={s.wheel}>
          {sectors.map((sector) => (
            <div
              key={sector}
              className={cn(
                s.sector
              )}
              style={{
                transform: getSectorTransform(sector),
              }}
            >

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuckyWheelPage;
