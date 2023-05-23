import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { cn, SVGIcons } from '@nxplatform/helpers';
import { SvgIcon } from '../../../elements/svg-icon';


const DefaultArrow = () => (<SvgIcon name={SVGIcons.arrow} />);

interface ArrowWrapperProps {
  disabled: boolean;
  modifier: string;
  icon?: React.ComponentType<any>;
  onClick: VoidFunction;
  hideSingleArrow: boolean;
}

const ArrowWrapper: React.FC<ArrowWrapperProps> = (
  {
    disabled,
    modifier,
    icon,
    onClick,
    hideSingleArrow,
  },
) => {
  const ArrowIcon = icon || DefaultArrow;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn([
        'horizontal-menu__arrow-wrapper',
        `horizontal-menu__arrow-wrapper--${modifier}`,
        disabled && hideSingleArrow && 'horizontal-menu__arrow-wrapper--disabled',
      ])}
    >
      <ArrowIcon />
    </button>
  );
};


interface ArrowProps {
  icon?: React.ComponentType<any>;
  hideSingleArrow: boolean;
}

export const LeftArrow: React.FC<ArrowProps> = (
  {
    icon,
    hideSingleArrow,
  },
) => {
  const {
    isFirstItemVisible,
    visibleItemsWithoutSeparators,
    initComplete,
    scrollToItem,
    getItemById,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  const clickHandler = () => {
    scrollToItem(
      getItemById(visibleItemsWithoutSeparators[0]),
      'smooth',
      'end',
    );
  };

  return (
    <ArrowWrapper
      disabled={disabled}
      modifier="left"
      icon={icon}
      onClick={clickHandler}
      hideSingleArrow={hideSingleArrow}
    />
  );
};

export const RightArrow: React.FC<ArrowProps> = (
  {
    icon,
    hideSingleArrow,
  },
) => {
  const {
    isLastItemVisible,
    visibleItemsWithoutSeparators,
    scrollToItem,
    getItemById,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible,
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  const clickHandler = () => {
    scrollToItem(
      getItemById(visibleItemsWithoutSeparators[visibleItemsWithoutSeparators.length - 1]),
      'smooth',
      'start',
    );
  };

  return (
    <ArrowWrapper
      disabled={disabled}
      modifier="right"
      icon={icon}
      onClick={clickHandler}
      hideSingleArrow={hideSingleArrow}
    />
  );
};
