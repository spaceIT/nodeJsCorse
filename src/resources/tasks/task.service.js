const tasksRepo = require('./task.memory.repository');

/**
 * @memberOf module:TasksService
 * @return {Promise<ITask[]>}
 */

const getAll = () => tasksRepo.getAll();

/**
 * @memberOf module:TasksService
 * @param {string} id - ID of task
 * @return {Promise<ITask>} deleted task
 */
const getById = (id) => tasksRepo.getById(id);

/**
 * @memberOf module:TasksService
 * @param {string} id - ID of task  
 * @param {ITask} id - Task information
 * @return {Promise<ITask>} created task
 */
const createTask = (id, task) => tasksRepo.createTask(id, task);

/**
 * @memberOf module:TasksService
 * @param {string} id - ID of task
 * @return {Promise<ITask>} deleted task
 */
const deleteById = (id) => tasksRepo.deleteById(id);

/**
 * @memberOf module:TasksService
 * @param {Partial<ITask>} id - ID of task
 * @param {Partial<ITask>} boardId - boardId of task
 * @param {Partial<ITask>} data - Optional properties to update
 * @return {Promise<ITask>} updated task
 */
const updateById = (id, boardId, task) => tasksRepo.updateById(id, boardId, task);

module.exports = { getAll, getById, createTask, deleteById, updateById };
