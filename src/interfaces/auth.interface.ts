import { Id } from './types';

export interface IAuthToken {
  userId: Id;
  login: string;
}

export interface ILogin {
  login: string;
  password: string;
}