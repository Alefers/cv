import type { FC } from 'react';
import s from './lucky-wheel.module.scss';
import { __, cn } from '@repo/helpers';
import { useState } from 'react';


const getTan = (degree: number) =>
  Math.tan((degree * Math.PI) / 180)

const LuckyWheelPage: FC = () => {
  const [count, setCount] = useState(5);

  const onCountChange = (val: number) => {
    if (val > 1 && val < 20) {
      setCount(val);
    }
  };

  const sectors = Array.from(Array(count).keys());

  const angle = 360 / count;

  const getSectorTransform = (idx: number): string => {

    return [
      `rotate(${angle * idx}deg)`,
    ].join(', ');
  };

  const getPolygon = () => {
    if (count < 4) {
      const sideWidth = 100 - getTan(90 - angle / 2) * 100;
      return `polygon(100% 0, 100% ${sideWidth}%, 50% 100%, 0 ${sideWidth}%, 0 0)`;
    } else {
      const halfWidth = getTan(angle / 2) * 50;
      return `polygon(${50 - halfWidth}% 0, 50% 100%, ${50 + halfWidth}% 0)`;
    }
  };

  return (
    <div className={s.luckyWheel}>
      <h1 className="heading heading--h1">
        {__('Default_._Heading_._Lucky Wheel')}
      </h1>

      <div className={s.count}>
        <div
          className={s.countButton}
          onClick={() => onCountChange(count - 1)}
        >
          -
        </div>
        <div className={s.countCurrent}>
          {count}
        </div>
        <div
          className={s.countButton}
          onClick={() => onCountChange(count + 1)}
        >
          +
        </div>
      </div>
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
                clipPath: getPolygon(),
              }}
            >
              <div>
                {sector + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuckyWheelPage;
