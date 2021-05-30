import express from 'express';
import User from './user.model';
import * as usersService from './user.service';

const router = express.Router();


router.route('/').get(async (res: express.Response) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req: express.Request, res: express.Response) => {
  const user = await usersService.createUser(req.body);

  res.status(201).send(User.toResponse(user));
});

router.route('/:id').get(async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (id) {
    const user = await usersService.getById(id);
    if (user) {
      res.json(User.toResponse(user));
    }
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (id) {
    await usersService.deleteById(id);
  }

  res.status(204).send('User deleted');
});


router.route('/:id').put(async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (id) {
    const user = await usersService.updateById(id, req.body);
    if (user) {
      res.status(200).send(User.toResponse(user));
    }
  }
});

export default router;
