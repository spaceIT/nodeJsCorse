const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository')

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const createUser = (user) => usersRepo.createUser(user);
const updateById = (id, user) => usersRepo.updateById(id, user);
const deleteById = (id) => {
  tasksRepo.removeUserById(id);
  usersRepo.deleteById(id);
};


module.exports = { getAll, getById, createUser,updateById, deleteById};
