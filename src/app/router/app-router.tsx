import React, { useEffect } from 'react';
import { getIsMobile } from '@cv/helpers';
import { getDesktopRouter } from './desktop-router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useControlAppLoader } from '@cv/common';
import { useDispatch } from 'react-redux';
import { setAppLoading } from '@cv/settings';


const AppRouter: React.FC = () => {
  const isMobile = getIsMobile();
  const dispatch = useDispatch();
  const routesMap = isMobile ? [] : getDesktopRouter();
  const router = createBrowserRouter(routesMap);

  const removeLoader = () => {
    dispatch(setAppLoading(false));
  };

  useEffect(() => {
    // After initial data loading
    // ...
    const timerId = setTimeout(removeLoader, 700);
    return () => {
      clearTimeout(timerId);
    }
  }, []);

  const { loading } = useControlAppLoader();

  return (
    <>
      {!loading && (
        <RouterProvider router={router} />
      )}
    </>
  );
};

export default AppRouter;