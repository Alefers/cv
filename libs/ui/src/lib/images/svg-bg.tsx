import React, { MutableRefObject, useMemo } from 'react';
import { useSvgParamsHook } from '@cv/common';
import { FourSidesSvg } from './four-sides-svg';


interface SvgBgProps {
  lineSize?: number;
  customRadius?: number;
  leftDif?: number;
  rightDif?: number;
}

export const SvgBg = (
  {
    lineSize = 2,
    customRadius = 0,
    leftDif = 5,
    rightDif = 6,
  }: SvgBgProps
) => {
  const { bgRef, params } = useSvgParamsHook();

  const commands = useMemo(() => {
    if (params) {
      const right = params.h > 35 ? rightDif : rightDif / 2;
      const left = params.h > 35 ? leftDif : leftDif / 2;
      return [
        0, 0,
        params.w, 0,
        params.w - right, params.h,
        left, params.h,
      ];
    }
    return null;
  }, [params, rightDif ,leftDif]);

  return (
    <span className="svg-bg-container" ref={bgRef as MutableRefObject<HTMLSpanElement>}>
      {params && (
        <FourSidesSvg
          height={params.h}
          width={params.w}
          lineSize={lineSize}
          commands={commands}
          svgClassName="svg-bg"
          pathClassName="svg-bg__path"
          radius={customRadius || (params.h > 40 ? 15 : params.h < 30 ? 5 : 8)}
        />
      )}
    </span>
  );
};
