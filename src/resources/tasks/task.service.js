const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = (id) => tasksRepo.getById(id);
const createTask = (id, task) => tasksRepo.createTask(id, task);
const deleteById = (id) => tasksRepo.deleteById(id);
const updateById = (id, boardId, task) => tasksRepo.updateById(id, boardId, task);

module.exports = { getAll, getById, createTask, deleteById, updateById };
