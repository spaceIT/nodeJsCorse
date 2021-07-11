import { getRepository } from 'typeorm';
import User, { TypeUser } from './user.model';
import { getHash } from '../../utils/crypto';

let users = [new User()];

const prepareUser = async (user: User): Promise<User> => ({
  ...user,
  password: await getHash(user.id),
});
const getAll = async () => users;
export const getByLogin = async (login: string): Promise<User | undefined> =>
  getRepository(User).findOne({ login });

const getById = async (id: string) => users.find(user => user.id === id);
const createUser = async (user: TypeUser) => {
  const newUser = new User(user);

  users.push(newUser);

  return newUser;
};

const deleteById = async (id: string) => {
  const findedUser = getById(id);
  users = users.filter(item => item.id !== id);

  return findedUser;
};

const updateById = async (id: string, user: TypeUser) => {
  const findedUser = users.find(item => item.id === id);

  const { name, login, password } = user;

  if (findedUser) {
    findedUser.name = name;
    findedUser.login = login;
    findedUser.password = password;
  }

  return findedUser;
};

export { getAll, getById, createUser, deleteById, updateById, prepareUser };
