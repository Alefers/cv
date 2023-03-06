export interface ColorSettings {
  color: string;
  background: string;
  gradientStart: string;
  gradientStop: string;
}

export interface Promotion {
  id: number;
  title: string;
  settings?: ColorSettings;
}

export const defaultPromoColorsSet: ColorSettings = {
  color: '#027C49',
  background: '#027C49',
  gradientStart: '#027B48',
  gradientStop: '#007972',
}

export const getPromoThemeColors = (promo: Promotion): ColorSettings => {
  return { ...defaultPromoColorsSet, ...(promo.settings || null) };
};
