import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../../types/models';
import { $api } from '../http';

export default class AuthService {
  static async login(
    username: string,
    password: string,
    remember_me: boolean,
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post('/auth/jwt/create', {
      username,
      password,
      remember_me,
    });
  }

  static async logout(): Promise<void> {
    return $api.post('/auth/jwt/logout');
  }
}
