import React from 'react';
import { Promotion, selectPromotions } from '@repo/promotions';
import { useSelector } from 'react-redux';
import PromotionItem from './promotion-item';
import { Slider } from '@repo/ui';


const PromotionsSection: React.FC = () => {
  const promotions: Promotion[] = useSelector(selectPromotions);

  return (
    <Slider
      firstSlide={0}
      items={1}
      controlsType="both"
    >
      {promotions.map((promo) => (
        <PromotionItem
          promo={promo}
          key={promo.id}
        />
      ))}
    </Slider>
  );
};

export default PromotionsSection;
