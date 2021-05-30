const User = require('./user.model');

let users = [new User()];

/**
 * @memberOf module:UsersRepo
 * @returns {Promise<IUser[]>}
 */

const getAll = async () => users;

/**
 * @memberOf module:UsersRepo
 * @param {string} id - ID of user
 * @returns {Promise<IUserWithoutPassword>}
 */
const getById = async (id) => users.find(user => user.id === id);


/**
 * @memberOf module:UsersRepo
 * @param {IUser} data - New user's data
 * @returns {Promise<IUserWithoutPassword>}
 */
const createUser = async (user) => {
  const newUser = new User(user)

  users.push(newUser);

  return newUser;
}


/**
 * @memberOf module:UsersRepo
 * @param {string} id - ID of user to delete
 * @returns {Promise<IUserWithoutPassword>} deleted user
 */
const deleteById = async (id) => {
  const findedUser = getById(id);
  users = users.filter(item => item.id !== id)

  return findedUser
}

/**
 * @memberOf module:UsersRepo
 * @param {string} id - ID of the user that needs to be updated
 * @param {Partial<IUser>} data - Optional user properties to update
 * @returns {Promise<IUserWithoutPassword>} updated user
 */

const updateById = async (id, user) => {
  const findedUser = users.find(item => item.id === id)

  const { name, login, password } = user;

  findedUser.name = name
  findedUser.login = login
  findedUser.password = password

  return users
}



module.exports = { getAll, getById, createUser, deleteById, updateById };

