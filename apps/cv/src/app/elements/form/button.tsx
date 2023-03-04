import React, { memo, SyntheticEvent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@repo/helpers';
import { DotLoader, SvgBg } from '@repo/ui';


interface ButtonProps {
  text: string;
  modifiers: ButtonTypes[];
  type?: 'button' | 'submit' | 'reset'
  className?: string;
  link?: string;
  disabled?: boolean;
  isBaseLink?: boolean;
  borderRadius?: number;
  loader?: boolean;
  clickHandler?: (e?: SyntheticEvent) => void;
}

export type ButtonTypes = 'outline' | 'default' | 'gradient' | 'main' | 'secondary' | 'full' | 'glow';

const Button = (
  {
    text,
    modifiers,
    type,
    className,
    link,
    disabled,
    isBaseLink,
    borderRadius,
    loader,
    clickHandler,
  }: ButtonProps
) => {
  const classModifiers = useMemo(() =>
      modifiers.map(buttonType => `ui-button--${buttonType}`).join(' ')
    , [type, modifiers]
  );

  const commonProps = {
    className: cn([
      'ui-button',
      className,
      classModifiers,
      disabled && 'ui-button--disabled',
    ]),
    onClick: clickHandler,
  }

  const innerContent = useMemo(() => (
    <>
      <SvgBg customRadius={borderRadius}/>
      <span className="ui-button__inner">
        {text}
      </span>
    </>
  ), []);

  if (link) {
    return (
      <>
        {isBaseLink
          ? (
            <a
              href={link}
              {...commonProps}
              target="_blank"
              rel="nofollow"
            >
              {innerContent}
            </a>
          )
          : (
            <Link
              to={link}
              {...commonProps}
            >
              {innerContent}
            </Link>
          )
        }
      </>
    );
  }

  return (
    <button
      type={type || 'button'}
      disabled={!!disabled}
      className={cn([
        'ui-button',
        className,
        classModifiers,
        disabled && 'ui-button--disabled',
      ])}
      onClick={clickHandler}
    >
      {innerContent}
      {loader && <DotLoader/>}
    </button>
  );
};

const _Button =  memo(Button);

export {
  _Button as Button,
};
