import React from 'react';
import { useLocation } from 'react-router';
import s from './header-menu.module.scss';
import { Link } from 'react-router-dom';
import { cn } from '@repo/helpers';
import { SvgIcon } from '@repo/icons';
import { MenuItem } from '@repo/common';


interface HeaderMenuItemProps {
  item: MenuItem;
  fake?: boolean;
}

export const HeaderMenuItem: React.FC<HeaderMenuItemProps> = (
  {
    item,
    fake,
  }
) => {
  const { pathname } = useLocation();
  const Tag = fake ? 'div' : Link

  return (
    <li
      className={cn([
        s.item,
        pathname === item.link && s.active,
      ])}
    >
      <Tag
        to={item.link}
        className={s.link}
      >
        {item.icon && (
          <SvgIcon icon={item.icon} />
        )}
        <div className={s.name}>
          {item.name}
        </div>
      </Tag>
    </li>
  );
};
