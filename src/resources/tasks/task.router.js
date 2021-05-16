const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {

  const tasks = await tasksService.getAll();
  
  res.json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
    const {  boardId } = req.params;

    const task = await tasksService.createTask(boardId, req.body);
    res.status(201).send(Task.toResponse(task));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.getById(id);

  res.json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {

  const { id } = req.params;
  const allTasks = await tasksService.deleteById(id);

  res.status(204).send(allTasks.map(Task.toResponse));
});


router.route('/:id').put(async (req, res) => {
    const { id, boardId } = req.params;

    const task = await tasksService.updateById(id, boardId, req.body);

    res.status(200).send(Task.toResponse(task));

});

module.exports = router;
