import { __, generateWebpPath } from '@repo/helpers';


export enum AppLandSlideStatus {
  invisible,
  ready,
  hide,
}

export enum MobAppSection {
  none = 'none',
  coupon = 'coupon',
  vip = 'vip',
  sport = 'sport',
}

export const mobAppImgPath = (path: string) =>
  generateWebpPath({ path, webpSupport: window.webpSupport });

export interface MobAppSectionIcon {
  title: string;
  icon: string;
}

export interface MobAppSectionPhoneMain {
  width: number;
  height: number;
}

export interface MobAppSectionPhoneImage extends MobAppSectionPhoneMain {
  pos: number;
  img: number;
}

interface MobAppSectionItem {
  id: MobAppSection;
  title: string;
  text: string;
  icons: MobAppSectionIcon[];
  phoneMain: MobAppSectionPhoneMain;
  phoneImages: MobAppSectionPhoneImage[];
}

export const mobAppSectionsMap: MobAppSectionItem[] = [
  {
    id: MobAppSection.coupon,
    title: __('App landing_._Section coupon_._Awesome betting coupon'),
    text: __('App landing_._Section coupon_._Coupon text'),
    icons: [
      {
        title: __('App landing_._Section coupon_._Single'),
        icon: 'coupon-single',
      },
      {
        title: __('App landing_._Section coupon_._Multibet'),
        icon: 'coupon-multi',
      },
      {
        title: __('App landing_._Section coupon_._Fastest'),
        icon: 'coupon-fastest',
      },
    ],
    phoneMain: {
      width: 392,
      height: 771,
    },
    phoneImages: [
      { pos: 1, img: 1, width: 344, height: 32 },
      { pos: 2, img: 2, width: 360, height: 112 },
      { pos: 3, img: 3, width: 344, height: 96 },
      { pos: 4, img: 4, width: 344, height: 56 },
      { pos: 5, img: 5, width: 376, height: 204 },
    ],
  },
  {
    id: MobAppSection.vip,
    title: __('App landing_._Section vip_._VIP program'),
    text: __('App landing_._Section vip_._VIP text'),
    icons: [
      {
        title: __('App landing_._Section vip_._Growth'),
        icon: 'vip-growth',
      },
      {
        title: __('App landing_._Section vip_._Free bets'),
        icon: 'vip-free-bets',
      },
      {
        title: __('App landing_._Section vip_._Free spins'),
        icon: 'vip-free-spins',
      },
    ],
    phoneMain: {
      width: 392,
      height: 793,
    },
    phoneImages: [
      { pos: 1, img: 1, width: 344, height: 234 },
      { pos: 2, img: 2, width: 344, height: 192 },
      { pos: 3, img: 3, width: 344, height: 136 },
      { pos: 4, img: 4, width: 344, height: 80 },
    ],
  },
  {
    id: MobAppSection.sport,
    title: __('App landing_._Section sport_._A wide sports range'),
    text: __('App landing_._Section sport_._Sport text'),
    icons: [
      {
        title: __('App landing_._Section sport_._Live'),
        icon: 'sport-live',
      },
      {
        title: __('App landing_._Section sport_._Filter'),
        icon: 'sport-filter',
      },
      {
        title: __('App landing_._Section sport_._TOP'),
        icon: 'sport-top',
      },
      {
        title: __('App landing_._Section sport_._International'),
        icon: 'sport-international',
      },
    ],
    phoneMain: {
      width: 392,
      height: 820,
    },
    phoneImages: [
      { pos: 1, img: 1, width: 344, height: 36 },
      { pos: 2, img: 2, width: 427, height: 40 },
      { pos: 3, img: 3, width: 344, height: 201 },
      { pos: 4, img: 4, width: 344, height: 169 },
      { pos: 5, img: 4, width: 344, height: 169 },
      { pos: 6, img: 6, width: 376, height: 77 },
    ],
  },
];
