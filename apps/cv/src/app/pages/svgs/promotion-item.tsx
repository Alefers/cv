import React from 'react';
import s from './promotion-item.module.scss';
import { getPromoThemeColors, Promotion } from '@repo/promotions';
import { LazyImage, SvgBgLayer } from '@repo/ui';
import { SvgGradientType } from '@repo/common';
import { cn } from '@repo/helpers';


const promoBorder = [
  0, 36,
  0, 19,
  10, 0,
  17, 36,
];

const promoBg = [
  22, 15,
  19, 0,
  19, 12,
  38, 18,
];

interface PromotionItemProps {
  promo: Promotion;
}

const PromotionItem: React.FC<PromotionItemProps> = (
  {
    promo,
  }
) => {
  const theme = getPromoThemeColors(promo);

  return (
    <div className={s.promo}>
      <div className={s.top}>
        <SvgBgLayer
          dots={promoBorder}
          additionalClass={cn([
            s.svgBg,
            s.outline
          ])}
          lineSize={3}
          stroke={theme.stroke}
        />
        <SvgBgLayer
          dots={promoBg}
          additionalClass={cn([
            s.svgBg,
            s.filled
          ])}
          gradientType={SvgGradientType.promo}
          gradientStart={theme.gradientStart}
          gradientStop={theme.gradientStop}
        />
        <div className={s.topContent}>
          <div className={s.topTitle}>
            {promo.title}
          </div>
          <div className={s.block}>

          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.bottomDescription}>

        </div>
        <div className={s.bottomAction}>
          <LazyImage
            src={''}
            className={s.bottomImage}
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionItem;