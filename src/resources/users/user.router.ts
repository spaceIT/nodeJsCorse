import express from 'express';
import User from './user.model';
import * as usersService from './user.service';
import { logResponse } from '../../middleware/logger';

const router = express.Router();

router.route('/').get(async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
    logResponse(res);
  } catch (e) {
    next(e);
  }
});

router.route('/').post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = await usersService.createUser(req.body);

    res.status(201).send(User.toResponse(user));
    logResponse(res);
  } catch (e) {
    next(e);
  }
});

router.route('/:id').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await usersService.getById(id);
      if (user) {
        res.json(User.toResponse(user));
        logResponse(res);
      }
    }
  } catch (e) {
    next(e);
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    if (id) {
      await usersService.deleteById(id);
    }

    res.status(204).send('User deleted');
    logResponse(res);
  } catch (e) {
    next(e);
  }
});

router.route('/:id').put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await usersService.updateById(id, req.body);
      if (user) {
        res.status(200).send(User.toResponse(user));
        logResponse(res);
      }
    }
  } catch (e) {
    next(e);
  }
});

export default router;
