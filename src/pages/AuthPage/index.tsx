import React, { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { $user, loginFx } from '../../store/auth-page';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkAuth } from '../../utils/checkAuth';

import { ILogin } from '../../types/models';
import { ButtonIcon } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Checkbox } from '../../components/UI/Checkbox';

import './auth-page.scss';
import { useStore } from 'effector-react';

const AuthPage: React.FC = () => {
  const [authData, setAuthData] = useState<ILogin>({
    username: 'kabex@noreply.com',
    password: 'XKn51mxH',
    remember_me: false,
  });
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isLogining, setIsLogining] = useState<boolean>(false);
  const onHandleClickCheckbox = () => {
    setIsRemember(!isRemember);
  };

  const { username, password } = authData;

  const navigate = useNavigate();
  const history = useLocation();

  useEffect(() => {
    checkAuth().then((res) => {
      console.log(res);
      if (res.isAuth)
        navigate(history.pathname === '/auth' ? '/' : history.pathname);
      else navigate('/');
    });
  }, []);
  const onChangeUsername = (data: string) =>
    setAuthData({ ...authData, username: data });
  const onChangePassword = (data: string) =>
    setAuthData({ ...authData, password: data });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLogining(true);
    e.preventDefault();
    const hashed = {
      username: bcrypt.hashSync(username, 10),
      password: bcrypt.hashSync(password, 10),
    };
    // loginFx({ username: hashed.username, password: hashed.password, remember_me: isRemember }).finally(() =>
    //   setIsLogining(false),
    // );
    loginFx({
      username: username,
      password: password,
      remember_me: isRemember,
    }).finally(() => setIsLogining(false));
  };

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <div className="container-title">Авторизация</div>
        <form className="container-form" onSubmit={(e) => onSubmit(e)}>
          <div className="container-input">
            <Input
              placeholder="Email"
              value={username}
              name="email"
              onHandleChange={onChangeUsername}
              type="email"
            />
          </div>
          <div className="container-input">
            <Input
              placeholder="Password"
              name="password"
              value={password}
              onHandleChange={onChangePassword}
              type="password"
            />
          </div>
          <div className="container-checkbox">
            <Checkbox
              id="remember"
              title="Запомни меня"
              value={isRemember}
              onHandleClick={onHandleClickCheckbox}
            />
          </div>
          <div className="container-btn">
            <ButtonIcon
              title="Войти"
              type="submit"
              disabled={isLogining}
              onHandleClick={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
