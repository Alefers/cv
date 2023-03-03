import React, { memo, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import s from './button.module.scss';
import { SvgBg } from '../images/svg-bg';
import { DotLoader } from '../loaders/dot-loader';
import { Link } from 'react-router-dom';
import { cn } from '@repo/helpers';


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

export type ButtonTypes = 'outline' | 'default' | 'gradient' | 'classic-default' | 'classic-outline' | 'main' | 'secondary'
  | 'bonus'| 'light' | 'medium' | 'login' | 'login-light' | 'full' | 'dark' | 'form-dark' | 'small' | 'rotated' | 'glow' | 'reset';

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
  const setButtonModifiers = () => modifiers.map(buttonType => `ui-button--${buttonType}`).join(' ');
  const [classModifiers, setModifiers] = useState<string>();

  useEffect(() => setModifiers(setButtonModifiers()), [type, modifiers]);

  const commonProps = {
    className: cn([
      s.ttt,
      'ui-button',
      className,
      classModifiers,
      disabled && 'ui-button--disabled',
    ]),
    onClick: clickHandler,
  }

  const innerContent = useMemo(() => (
    <>
      {!modifiers.find((mod) => (mod === 'classic-default' || mod === 'classic-outline')) && (
        <SvgBg customRadius={borderRadius}/>
      )}
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
      {...commonProps}
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
