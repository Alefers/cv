import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAppLoadingState } from '@repo/settings';


export const appLoaderClass = 'app-loading';

export const useControlAppLoader = () => {
  const appLoading = useSelector(selectAppLoadingState);

  useEffect(() => {
    appLoading
      ? document.body.classList.add(appLoaderClass)
      : document.body.classList.remove(appLoaderClass);
  }, [appLoading])

  return {
    loading: appLoading,
  };
};
