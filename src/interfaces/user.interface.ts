import { IEntity } from './entity.interface';

export interface IUser extends IEntity {
  name: string;
  login: string;
  password: string;
}

export type IUserDto = Omit<IUser, 'id'>;
