import React from 'react';
import s from './main.module.scss';
import { __ } from '@cv/helpers';


const MainPage: React.FC = () => {
  return (
    <div className={s.main}>
      <h1 className="heading heading--h1">
        {__('Default_._Heading_._Main page')}
      </h1>
      <p>
        No content for that moment, just testing new routing
      </p>
    </div>
  );
};

export default MainPage;