import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../../types/models';
import { $api } from '../http';
import { clearTenderList } from '../../store/search-store';
import { clearTenderInfo } from '../../store/tender-store';

export default class AuthService {
  static async login(
    username: string,
    password: string,
    remember_me: boolean,
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post(
      '/auth/jwt/create',
      {
        username,
        password,
        remember_me,
      },
      {
        headers: {
          //'Access-Control-Allow-Origin': '*',
          //Accept: 'application/json',
          //Origin: 'https://tenderchad.loca.lt',
        },
      },
    );
  }

  static async logout(): Promise<void> {
    return await $api.post('/auth/jwt/logout');
  }
}
