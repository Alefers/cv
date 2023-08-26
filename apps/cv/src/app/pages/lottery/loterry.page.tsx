import type { FC } from 'react';
import s from './lottery.page.module.scss';
import { __, cn } from '@repo/helpers';
import { useState, useRef } from 'react';
import { LuckyWheel } from './lucky-wheel';


function getRandomIntTo(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomIntBetween(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomAngle(range: number) {
  return Math.floor(Math.random() * range * (Math.random() > 0.5 ? 1 : -1));
}

const LotteryPage: FC = () => {
  const [count, setCount] = useState(5);
  const [isSpinning, setSpinningState] = useState(false);
  const [result, setResult] = useState(0);
  const animatorRef = useRef<HTMLDivElement>(null);

  const onCountChange = (val: number) => {
    if (val > 1 && val < 20) {
      setCount(val);
    }
  };

  const toSpin = () => {
    const val = getRandomIntTo(count);
    const rotates = getRandomIntBetween(10, 14);
    const time = getRandomIntBetween(60, 80);
    const sectorAngle = 360 / count;
    const sectorRandom = getRandomAngle(sectorAngle * 0.48);
    const angleToSector = val * sectorAngle + sectorRandom;
    if (animatorRef.current) {
      const style = animatorRef.current.style;
      style.setProperty('--angleToSector', `${-angleToSector}deg`);
      style.setProperty('--spinningDuration', `${time / 10}s`);
      style.setProperty('--finalAngle', `${rotates * 360 - angleToSector}deg`);
    }
    setResult(val + 1);
    setSpinningState(true);
  };

  const reset = () => {
    setSpinningState(false);
  };

  return (
    <div className={s.lottery}>
      <h1 className="heading heading--h1">
        {__('Default_._Heading_._Lottery')}
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
      <div className={s.result}>
        <div
          className={s.resetButton}
          onClick={reset}
        >
          reset
        </div>
        <div className={s.resultText}>
          Result: <span>{result}</span>
        </div>
      </div>
      <div className={s.wheelWrapper}>
        <div
          ref={animatorRef}
          className={cn([
            s.animator,
            isSpinning && s.rotate,
          ])}
        >
          <LuckyWheel sectorsCount={count} />
        </div>
        <button
          className={s.spinButton}
          onClick={toSpin}
          disabled={isSpinning}
        >
          Spin
        </button>
      </div>
    </div>
  );
};

export default LotteryPage;
