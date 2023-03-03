import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/main-layout';
import MobileAppLanding from '../pages/landings/mobile-app/mobile-app-landing';
import MainPage from '../pages/main/main.page';
import { appRoutes } from '@repo/helpers';
import ButtonsPage from '../pages/buttons/buttons.page';


export const getDesktopRouter = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <MainPage />
        },
        {
          path: appRoutes.landing,
          element: <MobileAppLanding />
        },
        {
          path: appRoutes.buttons,
          element: <ButtonsPage />
        }
      ]
    }
  ];
};
