import React from 'react';
import { Promotion } from '@repo/promotions';


interface PromotionItemProps {
  promo: Promotion
}

const PromotionItem: React.FC<PromotionItemProps> = (
  {
    promo,
  }
) => {
  return (
    <div className="">

    </div>
  );
};

export default PromotionItem;