const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

/**
 * @name GET_ALL_TASKS
 * @memberOf module:TasksRouter
 * @function
 * @route {GET} /boards/:boardId/tasks/
 * @returns {ITask[]|Array} Array of tasks or empty array
 */
router.route('/').get(async (req, res) => {

  const tasks = await tasksService.getAll();

  res.json(tasks.map(Task.toResponse));
});

/**
 * @name CREATE_TASK
 * @memberOf module:TasksRouter
 * @function
 * @route {POST} /boards/:boardId/tasks/
 * @returns {ITask} created task
 */

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;

  const task = await tasksService.createTask(boardId, req.body);
  res.status(201).send(Task.toResponse(task));
});


/**
 * @name GET_TASK_BY_ID
 * @memberOf module:TasksRouter
 * @function
 * @route {GET} /boards/:boardId/tasks/:id
 * @returns {ITask|string} Task object or string if not found
 */
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.getById(id);

  res.json(Task.toResponse(task));
});


/**
 * @name DELETE_TASK_BY_ID
 * @memberOf module:TasksRouter
 * @function
 * @route {DELETE} /boards/:boardId/tasks/:id
 * @returns {ITask|string} deleted task or string if not found
 */
router.route('/:id').delete(async (req, res) => {

  const { id } = req.params;
  const allTasks = await tasksService.deleteById(id);

  res.status(204).send(allTasks.map(Task.toResponse));
});

/**
 * @name UPDATE_TASK_BY_ID
 * @memberOf module:TasksRouter
 * @function
 * @route {PUT} /boards/:boardId/tasks/:id
 * @returns {ITask|string} updated task object or string if not found
 */
router.route('/:id').put(async (req, res) => {
  const { id, boardId } = req.params;

  const task = await tasksService.updateById(id, boardId, req.body);

  res.status(200).send(Task.toResponse(task));

});

module.exports = router;
