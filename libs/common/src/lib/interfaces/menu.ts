import { SvgIconType } from '@repo/icons';

export interface MenuItem {
  name: string;
  link: string;
  icon?: SvgIconType;
}