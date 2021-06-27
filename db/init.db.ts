import { createUser, getByLogin } from '../src/resources/users/user.service';
import { IUserDto } from '../src/interfaces';

const DEFAULT_USER: IUserDto = {
  name: 'admin',
  login: 'admin',
  password: 'admin',
};

export const initDB = async (): Promise<boolean> =>
  Boolean((await getByLogin(DEFAULT_USER.login)) || (await createUser(DEFAULT_USER)));