import React, { useMemo } from 'react';
import { SvgGradient, SvgGradientType, useSvgParamsHook } from '@repo/common';
import { cn } from '@repo/helpers';
import { FourSidesSvg } from './four-sides-svg';


interface SvgBgLayerProps {
  additionalClass?: string;
  lineSize?: number;
  dots: number[];
  fill?: string;
  stroke?: string;
  gradientType?: SvgGradientType;
  customGradient?: SvgGradient;
  gradientStart?: string;
  gradientStop?: string;
}

const SvgBgLayer: React.FC<SvgBgLayerProps> = (
  {
    additionalClass,
    lineSize = 0,
    dots,
    fill,
    stroke,
    gradientType,
    customGradient,
    gradientStart,
    gradientStop,
  }
) => {
  const { bgRef, params } = useSvgParamsHook();

  const commands = useMemo(() => {
    if (params) {
      const { w, h } = params;
      return [
        dots[0], dots[1],
        w - dots[2], dots[3],
        w - dots[4], h - dots[5],
        dots[6], h - dots[7],
      ];
    }
    return null;
  }, [params, dots]);

  return (
    <div
      ref={bgRef}
      className={cn([
        'bg-layer',
        additionalClass,
      ])}
    >
      {!!params &&
        <FourSidesSvg
          height={params.h}
          width={params.w}
          commands={commands}
          lineSize={lineSize}
          fill={fill}
          stroke={stroke}
          gradientType={gradientType}
          customGradient={customGradient}
          gradientStart={gradientStart}
          gradientStop={gradientStop}
          svgClassName="svg-bg"
          pathClassName="svg-bg__path"
        />
      }
    </div>
  );
}

const _SvgBgLayer = SvgBgLayer;

export {
  _SvgBgLayer as SvgBgLayer,
};
