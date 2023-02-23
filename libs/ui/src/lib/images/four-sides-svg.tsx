import React, { useMemo } from 'react';
import {
  getSvgGradientByType,
  roundSvgPathCorners,
  SvgGradient,
  SvgGradientType,
  useUIDHook,
} from '@cv/common';


interface FourSidesSvgProps {
  height: number,
  width: number,
  lineSize?: number,
  commands: any;
  radius?: number;
  svgClassName?: string;
  pathClassName?: string;
  gradientType?: SvgGradientType;
  customGradient?: SvgGradient;
  fill?: string;
  stroke?: string;
  gradientStart?: string;
  gradientStop?: string;
}

export const FourSidesSvg: React.FC<FourSidesSvgProps> = (
  {
    height,
    width,
    lineSize = 0,
    commands,
    radius = 10,
    svgClassName,
    pathClassName,
    gradientType,
    customGradient,
    fill,
    stroke,
    gradientStart,
    gradientStop,
  }
) => {
  const gradientId = `def${useUIDHook()}`;

  const path = useMemo(() =>
    roundSvgPathCorners(commands, radius)
  , [commands, radius])

  const svgObj = useMemo(() =>
    gradientType
      ? {
        g: gradientType === SvgGradientType.custom ? customGradient : getSvgGradientByType(gradientType),
        props: {fill: `url(#${gradientId})`},
      }
      : {
        g: null,
        props: {},
      }
  , [gradientType]);

  return (
    <svg
      className={svgClassName}
      preserveAspectRatio="none"
      viewBox={`0 ${-1 * lineSize / 2} ${width} ${height + lineSize}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {!!gradientType && svgObj.g && (
        <linearGradient
          id={gradientId}
          x1={svgObj.g.x1}
          x2={svgObj.g.x2}
          y1={svgObj.g.y1}
          y2={svgObj.g.y2}
        >
          <stop
            className="start"
            offset={svgObj.g.offsetStart}
            stopColor={gradientStart}
          />
          <stop
            className="stop"
            offset={svgObj.g.offsetStop}
            stopColor={gradientStop}
          />
        </linearGradient>
      )}
      <path
        d={path}
        className={pathClassName}
        fill={fill}
        stroke={stroke}
        {...svgObj.props}
      />
    </svg>
  );
};
