import React from 'react';
import { Link } from 'react-router-dom';
import s from './header.module.scss';
import { __, appRoutes } from '@cv/helpers';
import { LazyImage } from '@cv/ui';
import { SvgIcon, svgIconsMap } from '@cv/icons';


interface HeaderProps {

}

const Header: React.FC<HeaderProps> = (
  {}
) => {
  return (
    <div className={s.header}>
      <div className={s.content}>
        <Link className={s.logo} to={appRoutes.home}>
          <LazyImage
            height={118}
            width={384}
            src="logo.svg"
            alt="Alefers"
            title="Alefers logo"
          />
        </Link>
        <nav className={s.nav}>
          <Link className={s.navLink} to={appRoutes.landing}>
            <SvgIcon icon={svgIconsMap.Template} />
            {__('Default_._Pages_._Landing')}
          </Link>
          <Link className={s.navLink} to={appRoutes.buttons}>
            <SvgIcon icon={svgIconsMap.Buttons} />
            {__('Default_._Pages_._Buttons')}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;