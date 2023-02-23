import fs from 'node:fs';


const ICONS_LIB_FOLDER = 'libs/icons/src/lib/svg';
const ICONS_MAP_PATH = 'libs/icons/src/lib/svg-icons.map.ts';

const generateIconsMap = () => {
  const icons = fs.readdirSync(ICONS_LIB_FOLDER);

  let imports = '';
  icons.forEach((icon) => {
    const nameParts = icon.replace(/\.[^/.]+$/, '').split(/-|_/);
    const iconName = `${nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')}`;

    imports += `
  ${iconName}: () => import('./svg/${icon}'),`;
  });

  const iconsMap = `// GENERATED BY GenerateIconsMapPlugin
// DO NOT EDIT IT MANUALLY
  
export const svgIconsMap = {${imports}
} as const;
`;

  fs.writeFileSync(ICONS_MAP_PATH, iconsMap);
  console.log(`generated icons map`);
};

generateIconsMap();
