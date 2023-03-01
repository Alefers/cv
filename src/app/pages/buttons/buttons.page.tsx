import React from 'react';
import s from './buttons.module.scss';
import { Button } from '@cv/ui';


const ButtonsPage: React.FC = () => {
  return (
    <div className={s.buttons}>
      <Button text={'ttt'} modifiers={['default', 'main']} />
    </div>
  );
};

export default ButtonsPage;