import localforage from 'localforage';
import { AuthResponse } from '../types/models';

export const checkAuth = async () => {
  if (
    (await localforage.getItem<{ access: string; username: string }>(
      'token',
    )) !== null
  ) {
    const username = await localforage
      .getItem<{ access: string; username: string }>('token')
      .then((res) => res?.username);
    return { isAuth: true, username: username };
  } else return { isAuth: false, username: '' };
};
