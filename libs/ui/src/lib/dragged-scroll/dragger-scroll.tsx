import React from 'react';
import s from './dragger-scroll.module.scss';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { cn } from '@nxplatform/helpers';
import { useDrag } from '../../../hooks/drag.hook';
import { LeftArrow, RightArrow } from './dragger-scroll-arrows';


type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface DraggedScrollItemProps {
  itemId: string | number;
  children: React.ReactElement;
  dragging: boolean;
  onClick: (context: scrollVisibilityApiType) => void;
}

const DraggedScrollItem = (
  {
    itemId,
    children,
    dragging,
    onClick,
  }: DraggedScrollItemProps,
) => {
  const visibility = React.useContext(VisibilityContext);

  const handleClick = () => {
    const visible = visibility.isItemVisible(itemId.toString());
    if (!visible) {
      onClick(visibility);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ pointerEvents: dragging ? 'none' : 'auto' }}
    >
      {children}
    </div>
  );
};

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollToItem(
      apiObj.getItemById(apiObj.visibleItemsWithoutSeparators[0]),
      'smooth',
      'end',
    );
  }
  if (ev.deltaY > 0) {
    apiObj.scrollToItem(
      apiObj.getItemById(apiObj.visibleItemsWithoutSeparators[apiObj.visibleItemsWithoutSeparators.length - 1]),
      'smooth',
      'start',
    );
  }
}

interface DraggedScrollProps {
  arrows?: boolean;
  arrowIcon?: React.ComponentType<any>;
  hideSingleArrow?: boolean;
  classNames?: string[];
  children: React.ReactNodeArray;
  apiRef?: React.MutableRefObject<any>;
  wheelScroll?: boolean;
}

export const DraggedScroll: React.FC<DraggedScrollProps> = (
  {
    children,
    arrows = true,
    arrowIcon,
    hideSingleArrow = true,
    wheelScroll = true,
    classNames = [],
    apiRef,
  },
) => {
  const ArrowLeft = arrows ? (
    <LeftArrow
      icon={arrowIcon}
      hideSingleArrow={hideSingleArrow}
    />
  ) : null;

  const ArrowRight = arrows ? (
    <RightArrow
      icon={arrowIcon}
      hideSingleArrow={hideSingleArrow}
    />
  ) : null;

  const {
    dragStart, dragStop, dragMove, dragging,
  } = useDrag();
  const handleDrag = ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const handleClick = (itemId: string | number) =>
    ({ getItemById, scrollToItem }: scrollVisibilityApiType) => {
      if (dragging) {
        return false;
      }
      scrollToItem(getItemById(itemId.toString()), 'smooth', 'end', 'nearest');
    };

  const childrenMap = React.Children.toArray(children);

  return (
    <div className="horizontal-menu">
      <div
        className={cn([
          'scroll-container__wrapper',
          ...classNames,
          arrows ? 'menu-wrapper arrows-enabled' : 'menu-wrapper',
        ])}
        onMouseLeave={dragStop}
      >
        <ScrollMenu
          apiRef={apiRef}
          LeftArrow={ArrowLeft}
          RightArrow={ArrowRight}
          wrapperClassName={cn([s.wrapper])}
          onWheel={wheelScroll ? onWheel : null}
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
        >
          {childrenMap.map((child: React.ReactElement) => (
            <DraggedScrollItem
              key={child.key}
              onClick={handleClick(child.key)}
              itemId={child.key}
              dragging={dragging}
            >
              {child}
            </DraggedScrollItem>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};
