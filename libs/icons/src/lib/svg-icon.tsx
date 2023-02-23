import React, {
  memo, useState, useEffect,
} from 'react';
import { useCancellablePromise } from './cancellable-promise';


export type SvgIconType = () => Promise<typeof import('*.svg')>;

interface SvgIconProps {
  modifier?: string;
  icon: SvgIconType;
  onClick?: () => void;
}

interface IconSymbol {
  viewBox: string;
  id: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  modifier = '',
  icon,
  onClick,
}) => {
  const { cancellablePromise } = useCancellablePromise<{ default: IconSymbol }>();

  const [symbol, setSymbol] = useState<IconSymbol | null>(null);

  useEffect(() => {
    // @ts-ignore
    cancellablePromise(icon).then((module) => {
      setSymbol(() => module.default);
    }).catch(() => {});
  }, [icon]);

  return (
    <>
      {!!symbol && (
        <svg
          viewBox={symbol.viewBox}
          className={`svg-icon ${modifier}`}
          onClick={onClick}
        >
          <use href={`#${symbol.id}`} />
        </svg>
      )}
      {!symbol && (
        <svg
          className={`svg-icon svg-icon__placeholder ${modifier}`}
          onClick={onClick}
        />
      )}
    </>
  );
};

const _SvgIcon = memo(SvgIcon);

export { _SvgIcon as SvgIcon };
