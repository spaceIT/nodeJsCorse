const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository')

/**
 * @memberOf module:UsersService
 * @return {Promise<IUser[]>}
 */
const getAll = () => usersRepo.getAll();

/**
 * @memberOf module:UsersService
 * @param {string} id - ID of user
 * @return {Promise<IUserWithoutPassword>}
 */
const getById = (id) => usersRepo.getById(id);

/**
 * @memberOf module:UsersService
 * @param {IUser} data - User information
 * @return {Promise<IUserWithoutPassword>} created user
 */
const createUser = (user) => usersRepo.createUser(user);

/**
 * @memberOf module:UsersService
 * @param {string} id - ID of user
 * @param {Partial<IUser>} data - Optional properties to update
 * @return {Promise<IUserWithoutPassword>} updated user
 */
const updateById = (id, user) => usersRepo.updateById(id, user);

/**
 * @memberOf module:UsersService
 * @param {string} id - ID of user
 * @return {Promise<IUserWithoutPassword>} deleted user
 */
const deleteById = (id) => {
    tasksRepo.removeUserById(id);
    usersRepo.deleteById(id);
};

module.exports = { getAll, getById, createUser, updateById, deleteById };
