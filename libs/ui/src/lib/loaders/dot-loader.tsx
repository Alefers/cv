import React from 'react';
import s from './dot-loader.module.scss';
import { cn } from '@repo/helpers';


export const DotLoader = () => (
  <div className={s.wrapper}>
    <div className={cn([
      s.dots,
      s.three,
    ])}
    >
      <div className={s.dot} />
      <div className={cn([
        s.dots,
        s.two,
      ])}
      >
        <div className={s.dot} />
        <div className={s.dot} />
      </div>
    </div>
  </div>
);
