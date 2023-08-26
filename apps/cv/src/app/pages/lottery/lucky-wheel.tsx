import { memo } from 'react';
import type { FC } from 'react';
import s from './lucky-wheel.module.scss';
import { cn } from '@repo/helpers';


const getTan = (degree: number) =>
  Math.tan((degree * Math.PI) / 180)

interface LuckyWheelProps {
  sectorsCount: number;
}

const LuckyWheel: FC<LuckyWheelProps> = (
  {
    sectorsCount,
  }
) => {
  const sectors = Array.from(Array(sectorsCount).keys());

  const angle = 360 / sectorsCount;

  const getSectorTransform = (idx: number): string => {

    return [
      `rotate(${angle * idx}deg)`,
    ].join(', ');
  };

  const getPolygon = () => {
    if (sectorsCount < 4) {
      const sideWidth = 100 - getTan(90 - angle / 2) * 100;
      return `polygon(100% 0, 100% ${sideWidth}%, 50% 100%, 0 ${sideWidth}%, 0 0)`;
    } else {
      const halfWidth = getTan(angle / 2) * 50;
      return `polygon(${50 - halfWidth}% 0, 50% 100%, ${50 + halfWidth}% 0)`;
    }
  };

  return (
    <div className={s.wheel}>
      {sectors.map((sector) => (
        <div
          key={sector}
          className={cn(
            s.sector
          )}
          style={{
            transform: getSectorTransform(sector),
            clipPath: getPolygon(),
          }}
        >
          <div>
            {sector + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

const _LuckyWheel = memo(LuckyWheel);

export {
  _LuckyWheel as LuckyWheel,
};