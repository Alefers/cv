import React, {
  memo, useState, useEffect,
} from 'react';


export type SvgIconType = () => Promise<typeof import('*.svg')>;

interface SvgIconProps {
  modifier?: string;
  icon: SvgIconType;
  onClick?: () => void;
}

interface BrowserSpriteSymbol {
  id: string;
  viewBox: string;
  content: string;
  node: SVGSymbolElement;
}

const SvgIcon: React.FC<SvgIconProps> = (
  {
    modifier = '',
    icon,
    onClick,
  }
) => {
  const [symbol, setSymbol] = useState<BrowserSpriteSymbol | null>(null);

  useEffect(() => {
    if (typeof icon === 'function') {
      icon().then((module) => {
        if (setSymbol) {
          setSymbol(JSON.parse(JSON.stringify(module.default)));
        }
      }).catch(() => {});
    } else {
      console.log('Icon not exist');
    }
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
          className={`svg-icon svg-icon--placeholder ${modifier}`}
          onClick={onClick}
        />
      )}
    </>
  );
};

const _SvgIcon = memo(SvgIcon);

export { _SvgIcon as SvgIcon };
