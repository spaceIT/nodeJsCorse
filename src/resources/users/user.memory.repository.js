const User = require('./user.model');

let users = [new User()];

const getAll = async () => users;
const getById = async (id) => users.find(user => user.id === id);

const createUser = async (user) => {
  const newUser = new User(user)

  users.push(newUser);

  return newUser;
} 

const deleteById = async(id) => {
  const findedUser = getById(id);
  users = users.filter(item => item.id !== id)

  return findedUser
}

const updateById = async(id, user) => {
  const findedUser = users.find(item => item.id === id)

  const {name, login, password} = user;

  findedUser.name = name
  findedUser.login = login
  findedUser.password = password

  return users
}



module.exports = { getAll, getById, createUser, deleteById, updateById };

