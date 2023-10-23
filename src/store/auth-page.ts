import { createStore, createEffect, createEvent, sample } from 'effector';

import localforage from 'localforage';
import { AuthService } from '../api';
import { ILogin, IUser } from '../types/models';
import { clearTenderList } from './search-store';
import { clearTenderInfo } from './tender-store';

// export const setAuthError = createEvent<string>();

// export const $authError = createStore<string>('').on(
//   setAuthError,
//   (_, error) => error,
// );

export const loginFx = createEffect({
  handler: async ({ username, password, remember_me }: ILogin) => {
    try {
      const response = await AuthService.login(username, password, remember_me);
      return response.data; // Возвращаем данные из ответа API
    } catch (error) {
      // setAuthError('AUTH_ERROR')
      console.error('Error during login:', error);
      return null;
    }
  },
});

export const logoutFx = createEffect(AuthService.logout);
export const setUser = createEvent<IUser>();

export const $user = createStore<IUser>({
  isAuth: false,
  username: '',
})
  .on(setUser, (_, res) => res)
  .on(loginFx.done, (_, res) => {
    if (res.result)
      localforage.setItem('token', {
        access: res.result.access,
        username: res.result.username,
      });
    else
      return {
        isAuth: false,
        username: '',
      };
    return {
      isAuth: true,
      username: res.result.username,
    };
  })
  .on(logoutFx.done, () => {
    localforage.removeItem('token');
    return {
      isAuth: false,
      username: '',
    };
  });
