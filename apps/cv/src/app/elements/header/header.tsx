import React from 'react';
import { Link } from 'react-router-dom';
import s from './header.module.scss';
import { __, appRoutes } from '@repo/helpers';
import { LazyImage } from '@repo/ui';
import { SvgIcon, svgIconsMap } from '@repo/icons';


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
            src="/assets/logo.svg"
            alt="Alefers"
            title="Alefers logo"
          />
        </Link>
        <nav className={s.nav}>
          <Link className={s.navLink} to={appRoutes.landing}>
            <SvgIcon icon={svgIconsMap.Template} />
            {__('Default_._Pages_._Landing')}
          </Link>
          <Link className={s.navLink} to={appRoutes.svgs}>
            <SvgIcon icon={svgIconsMap.Buttons} />
            {__('Default_._Pages_._SVGs')}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;