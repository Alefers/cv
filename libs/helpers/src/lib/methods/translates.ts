import { createSelector } from '@reduxjs/toolkit';


declare global {
  interface Window {
    translates: { [key: string]: string };
  }
}

const translateSeparator = '_._';
const getTranslates = () => window.translates;

export const selectTranslatableData = createSelector(
  getTranslates,
  (translates, section: string) => section?.toLowerCase() || '',
  (translates, section, category: string) => category?.toLowerCase() || '',
  (translates, section, category, name: string) => name || '',
  (translates, section, category, name) => {
    try {
      const translatableSection = translates[section];
      return (
        translatableSection[category][name]
        || translatableSection[category][name.toLowerCase()]
        || name
      );
    } catch (e) {
      return name;
    }
  },
);

export const __ = (name: string, vars?: { [key: string]: string }) => {
  const modifiedNameArr: string[] = `${name || ''}`.split(translateSeparator);

  let trString = selectTranslatableData(
    getTranslates(),
    modifiedNameArr[0],
    modifiedNameArr[1],
    modifiedNameArr[2],
  );

  if (modifiedNameArr && modifiedNameArr.length === 1) {
    return name;
  }

  try {
    if (vars) {
      Object.keys(vars).forEach((key) => {
        trString = trString.replace(`%${key}%`, vars[key]);
      });
    }
    return typeof trString === 'string' ? trString : '';
  } catch (e) {
    if (modifiedNameArr[2]) {
      return modifiedNameArr[2];
    }
    return name;
  }
};