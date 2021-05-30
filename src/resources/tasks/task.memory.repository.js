const Task = require('./task.model');

let allTasks = [new Task()];

/**
 * @memberOf module:TasksRepo
 * @return {Promise<ITask[]>}
 */

const getAll = async () => allTasks;

/**
 * @memberOf module:TasksRepo
 * @param {string} id - ID of task
 * @return {Promise<ITask>}
 */
const getById = async (id) => allTasks.filter(item => item.id !== id)

/**
 * @memberOf module:TasksRepo
 * @param {ITask} data - New task's data
 * @returns {Promise<ITask>}
 */
const createTask = async (id, task) => {
  const newTask = new Task({ boardId: id, ...task })
  allTasks.push(newTask);

  return newTask;
}

/**
 * @memberOf module:TasksRepo
 * @param {string} id - ID of task
 * @return {Promise<ITask>} deleted task
 */
const deleteById = async (id) => {
  allTasks = allTasks.filter(item => item.id !== id)

  return allTasks
}

/**
 * @memberOf module:TasksRepo
 * @param {Partial<ITask>} data - Optional properties to update task
 * @returns {Promise<ITask>} updated task
 */
const updateById = async (id, boardId, task) => {
  const { title, order, description, userId, columnId } = task;

  const taskIdx = allTasks.findIndex(({ id: taskId }) => taskId === id);

  const updatedTask = { ...allTasks[taskIdx], title, order, description, userId, boardId, columnId };
  allTasks.splice(taskIdx, 1, updatedTask);

  return updatedTask;
}

/**
 * @memberOf module:TasksRepo
 * @param {string} id
 * @return {Promise<string>}
 */
const removeUserById = async (id) => {
  const assignedTasks = allTasks.filter(task => task.userId === id);

  await Promise.allSettled(assignedTasks.map(async (task) => updateById( task.id, task.boardId, {...task, userId: null} )));
  return 'Success';
}

/**
 * @memberOf module:TasksRepo
 * @param {string} boardId - ID of board
 * @return {Promise<string>}
 */
const deleteTasksByBoardId = async (boardId) => {
  const boardTasks = allTasks.filter(task => task.boardId === boardId);

  await Promise.allSettled(boardTasks.map(async (task) => deleteById(task.id)));
  return 'Success';
}

module.exports = { allTasks, getAll, getById, createTask, deleteById, updateById, removeUserById, deleteTasksByBoardId };
