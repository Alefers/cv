import React from 'react';


export const AppLandingDecorSet: React.FC = () => {
  return (
    <>
      <div className="app-landing__blur" />
      <div className="app-landing__bubble app-landing__bubble--orange" />
      <div className="app-landing__bubble app-landing__bubble--violet" />
      <div className="app-landing__circle app-landing__circle--small" />
      <div className="app-landing__circle app-landing__circle--medium" />
      <div className="app-landing__circle app-landing__circle--large" />
    </>
  );
};
