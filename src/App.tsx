import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { $user, setUser } from './store/auth-page';
import { checkAuth } from './utils/checkAuth';
import { AppLoader } from './components/UI/Loader';
import { PrivateApp } from './layout/private';
import { PublicApp } from './layout/public';
import './App.scss';

export const App: React.FC = () => {
  const user = useStore($user);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  useEffect(() => {
    checkAuth().then((res) => {
      if (res.isAuth) {
        setUser({ username: res.username ? res.username : '', isAuth: true });
        setIsAppLoading(false);
      } else {
        setUser({ username: '', isAuth: false });
        setIsAppLoading(false);
      }
    });
  }, []);
  return isAppLoading ? (
    <AppLoader />
  ) : (
    <div className="app">{user.isAuth ? <PrivateApp /> : <PublicApp />}</div>
  );
};
