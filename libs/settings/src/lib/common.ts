import { MenuItem } from '@repo/common';
import { __, appRoutes } from '@repo/helpers';
import { svgIconsMap } from '@repo/icons';


export const defaultSiteMenu: MenuItem[] = [
  {
    name: __('Default_._Pages_._Landing'),
    link: appRoutes.landing,
    icon: svgIconsMap.Template,
  },
  {
    name: __('Default_._Pages_._SVGs'),
    link: appRoutes.svgs,
    icon: svgIconsMap.Buttons,
  },
];