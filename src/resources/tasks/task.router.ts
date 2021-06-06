import express from 'express';
import Task from './task.model';
import * as tasksService from './task.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (_req: express.Request, res: express.Response) => {

  const tasks = await tasksService.getAll();

  res.json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req: express.Request, res: express.Response) => {
  const { boardId } = req.params;
  if (boardId) {
    const task = await tasksService.createTask(boardId, req.body);
    res.status(201).send(Task.toResponse(task));
  }
});

router.route('/:id').get(async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (id) {
    const task = await tasksService.getById(id);
    if (task) {
      res.json(Task.toResponse(task));
    }
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (id) {
    const allTasks = await tasksService.deleteById(id);

    res.status(204).send(allTasks.map(Task.toResponse));
  }
});

router.route('/:id').put(async (req: express.Request, res: express.Response) => {
  const { id, boardId } = req.params;
  if (id && boardId) {
    const task = await tasksService.updateById(id, boardId, req.body);

    res.status(200).send(Task.toResponse(task));
  }

});

export default router;
