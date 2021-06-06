import User, { TypeUser } from './user.model';

let users = [new User()];

const getAll = async () => users;
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

export { getAll, getById, createUser, deleteById, updateById };
