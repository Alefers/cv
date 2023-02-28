import React from 'react';
import { __ } from '@cv/helpers';


const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <h1 className="heading heading--h1">
        {__('Default_._Heading_._Main page')}
      </h1>
    </div>
  );
};

export default MainPage;