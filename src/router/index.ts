import { lazy } from 'react';

const AuthPage = lazy(() => import('../pages/AuthPage'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const TenderPage = lazy(() => import('../pages/TenderPage'));

import {
  AUTH_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  SEARCH_ROUTE,
  TENDER_ROUTE,
} from '../utils/const';

export const routes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: SEARCH_ROUTE,
    Component: SearchPage,
  },
  {
    path: AUTH_ROUTE,
    Component: AuthPage,
  },
  {
    path: TENDER_ROUTE,
    Component: TenderPage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
];
