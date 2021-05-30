import express from 'express';
import Board from './board.model';
import * as boardsService from './board.service';

const router = express.Router();

router.route('/').get(async (_req: express.Request, res: express.Response) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req: express.Request, res: express.Response) => {
  try {
    const { id, title, columns } = req.body;

    const board = await boardsService.createBoard({ id, title, columns });

    res.status(201).send(Board.toResponse(board));
  } catch {
    res.status(400).send({ error: 'Bad request' });
  }
});

router.route('/:id').get(async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (id) {
    const board = await boardsService.getById(id);
    if (board) { res.json(Board.toResponse(board)); }
    else { res.status(404).send('Board not found'); }
  }
});

router.route('/:id').delete(async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    if (id) {
      await boardsService.deleteById(id);

      res.status(204).send('The board has been deleted');
    }
  } catch (e) {
    res.status(404).send('Board not found');
  }
});

router.route('/:id').put(async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { title, columns } = req.body;
    if (id) {
      const board = await boardsService.updateById({ id, title, columns });

      res.status(200).send(Board.toResponse(board));
    }
  } catch (e) {
    res.status(404).send('Board not found');
  }
});

export default router;
