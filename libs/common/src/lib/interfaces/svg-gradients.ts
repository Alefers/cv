export interface SvgGradient {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  offsetStart: number,
  offsetStop: number,
}

export enum SvgGradientType {
  button = 'button',
  promo = 'promo',
  custom = 'custom',
}

export const halfBottomTopRightGradient: SvgGradient = {
  x1: 0.4,
  x2: 1,
  y1: 0.8,
  y2: 0.6,
  offsetStart: .4,
  offsetStop: 1,
};
export const toBottomGradient: SvgGradient = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 1,
  offsetStart: 0,
  offsetStop: 1,
};

export const fixedGradientsMap: {[key: string]: SvgGradient} = {
  [SvgGradientType.button]: toBottomGradient,
  [SvgGradientType.promo]: halfBottomTopRightGradient,
};

export const getSvgGradientByType = (type: SvgGradientType): SvgGradient =>
  fixedGradientsMap[type] ?? toBottomGradient;
