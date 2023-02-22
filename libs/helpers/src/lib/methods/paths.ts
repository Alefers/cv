import { createSelector } from "@reduxjs/toolkit";


const allowedToSwitch = ['png', 'jpg', 'jpeg', 'webp'];

export const generateWebpPath = createSelector(
  (params: { path: string; webpSupport: boolean }) => params,
  (params) => {
    if (!params.path || typeof params.path !== 'string') {
      return '';
    }
    const pathAndParams = params.path.split('?');
    const fileExt = pathAndParams[0].split('.').slice(-1)[0];
    const paramsPart = pathAndParams.length > 1 && pathAndParams[1]
      ? `?${pathAndParams[1]}`
      : '';
    return params.webpSupport && allowedToSwitch.includes(fileExt.toLowerCase())
      ? `${pathAndParams[0].substr(
        0,
        pathAndParams[0].lastIndexOf('.'),
      )}.webp${paramsPart}`
      : params.path;
  },
);
