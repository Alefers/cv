import React from 'react';
import './layout.scss';
import { Outlet } from 'react-router-dom';
import Header from '../elements/header/header';


const MainLayout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <footer className="footer">

      </footer>
    </div>
  );
};

export default MainLayout;