import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';


const openAsideDifference = 90;

interface TopMenuSizeHookProps {
  selector: string;
  rightSpacing?: number;
  itemMargin?: number;
}

export const useHeaderMenuSizeHook = ({
  selector,
  rightSpacing = openAsideDifference,
  itemMargin = 2,
}: TopMenuSizeHookProps) => {
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const fakeNavRef = useRef<HTMLUListElement>(null);
  const [dropdownItemsCount, setDropdownItemsCount] = useState(0);
  const [readyToShow, setReady] = useState(false);

  const calcDropdownSize = (sizes: number[]): number => {
    if (!navWrapperRef.current) {
      return 0;
    }
    const maxWidth = navWrapperRef.current.offsetWidth - rightSpacing;
    const menuItemsCount = sizes.length - 1;
    const onlyItems = sizes.slice(0, menuItemsCount);
    const dotsWidth = sizes[menuItemsCount];
    const menuItemsWidth = onlyItems.reduce((acc, size) => acc + size, 0);

    let itemsCount = 0;
    if (maxWidth < menuItemsWidth) {
      let visibleMenuWidth = menuItemsWidth + dotsWidth;
      for (let i = menuItemsCount - 1; i >= 0; i--) {
        itemsCount++;
        visibleMenuWidth -= onlyItems[i];
        if (visibleMenuWidth < maxWidth) {
          setDropdownItemsCount(itemsCount);
          break;
        }
      }
    }

    return itemsCount;
  };

  const updateMenu = () => {
    setReady(true);
  };

  useLayoutEffect(() => {
    if (readyToShow && navWrapperRef.current && fakeNavRef.current) {
      const elements: NodeListOf<HTMLDivElement> = fakeNavRef.current.querySelectorAll(selector);
      const sizes: number[] = [];
      elements.forEach((child) => sizes.push(child.offsetWidth + itemMargin));
      setDropdownItemsCount(calcDropdownSize(sizes));
      setReady(false);
    }
  }, [readyToShow, navWrapperRef.current, fakeNavRef.current]);

  useEffect(() => {
    if (navWrapperRef.current && fakeNavRef.current) {
      const nawWrapperObserver = new ResizeObserver(updateMenu);
      nawWrapperObserver.observe(navWrapperRef.current);
      const nawElementsObserver = new ResizeObserver(updateMenu);
      nawElementsObserver.observe(fakeNavRef.current);

      return () => {
        nawWrapperObserver.disconnect();
        nawElementsObserver.disconnect();
      };
    }
  }, [navWrapperRef.current, fakeNavRef.current]);

  return {
    navWrapperRef,
    fakeNavRef,
    dropdownItemsCount,
  };
};
