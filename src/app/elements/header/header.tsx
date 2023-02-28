import React from 'react';
import { Link } from 'react-router-dom';
import s from './header.module.scss';
import { __ } from '@cv/helpers';


interface HeaderProps {

}

const Header: React.FC<HeaderProps> = (
  {}
) => {
  return (
    <div className={s.header}>
      <div className={s.content}>
        <div className={s.logo}>

        </div>
        <nav className={s.menu}>
          <Link to={}>
            {__('Default_._Pages_._Landing')}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;