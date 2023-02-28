interface TranslatesMap {
  [key1: string]: {
    [key2: string]: {
      [key3: string]: string;
    };
  };
}

declare global {
  interface Window {
    translates: TranslatesMap;
  }
}

type TranslateModifiers = [string, string, string];

const translateSeparator = '_._';
const getTranslates = () => window.translates;

export const selectTranslatableData = (modifiers: TranslateModifiers) => {
  const translates = getTranslates();
  const [section, category, name] = modifiers;
  try {
    const translatableSection = translates[section.toLowerCase()];
    return (
      translatableSection[category.toLowerCase()][name]
      || translatableSection[category.toLowerCase()][name.toLowerCase()]
      || name
    );
  } catch (e) {
    return name;
  }
};

export const __ = (name: string, vars?: { [key: string]: string }) => {
  if (typeof name !== 'string') {
    return name;
  }

  const modifiedNameArr: string[] = name.split(translateSeparator);

  if (modifiedNameArr.length !== 3) {
    return name;
  }

  let trString = selectTranslatableData(modifiedNameArr as TranslateModifiers);

  try {
    if (vars) {
      Object.keys(vars).forEach((key) => {
        trString = trString.replace(`%${key}%`, vars[key]);
      });
    }
    return trString;
  } catch (e) {
    return modifiedNameArr[2] || name;
  }
};
