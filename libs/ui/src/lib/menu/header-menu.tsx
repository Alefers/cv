import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import s from './header-menu.module.scss';
import { HeaderMenuItem } from './header-menu-item';
import { MenuItem, useHeaderMenuSizeHook } from '@repo/common';
import { cn } from '@repo/helpers';
import { useSelector } from 'react-redux';
import { selectAppMenu } from '@repo/settings';


export const HeaderMenu: React.FC = () => {
  const menuItems: MenuItem[] = useSelector(selectAppMenu);

  const {
    navWrapperRef, fakeNavRef, dropdownItemsCount,
  } = useHeaderMenuSizeHook({
    selector: `.${s.fakeWrapper} li`,
    itemMargin: 15,
  });

  const [isOpenDropdown, toggleOpenDropdown] = useState<boolean>(false);

  const dropDownRef = useRef(null);

  useEffect(() => {
    if (isOpenDropdown) {
      const closeDropdown = () => toggleOpenDropdown(false);
      document.addEventListener('click', closeDropdown);

      return () => {
        document.removeEventListener('click', closeDropdown);
      };
    }
  }, [isOpenDropdown]);

  const mappedMenu = useMemo(
    () => ({
      visible: menuItems.slice(0, menuItems.length - dropdownItemsCount) || [],
      dropdown: menuItems.slice(menuItems.length - dropdownItemsCount) || [],
    }),
    [menuItems, dropdownItemsCount],
  );

  return (
    <div className="header-menu" ref={navWrapperRef}>
      <div className={s.fakeWrapper}>
        <ul className={s.menu} ref={fakeNavRef}>
          {menuItems.map((menuItem: MenuItem) => (
            <HeaderMenuItem
              item={menuItem}
              key={menuItem.name}
              fake
            />
          ))}
          <li className={s.item}>
            <div className={s.link}>
              <div className={s.linkMore}>
                <span />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ul className={s.menu}>
        {mappedMenu.visible.map((menuItem) => (
          <HeaderMenuItem
            item={menuItem}
            key={menuItem.name}
          />
        ))}
        {dropdownItemsCount > 0 && (
          <li className={s.item}>
            <div
              className={s.link}
              aria-hidden="true"
              onClick={() => toggleOpenDropdown(!isOpenDropdown)}
            >
              <div className={s.linkMore}>
                <span />
              </div>
            </div>
            <ul
              ref={dropDownRef}
              className={cn([
                s.dropdownList,
                isOpenDropdown && s.opened,
              ])}
            >
              {mappedMenu.dropdown.map((menuItem) => (
                <HeaderMenuItem
                  item={menuItem}
                  key={menuItem.name}
                />
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};
