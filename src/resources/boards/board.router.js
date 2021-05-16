const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  try {
    const { id, title, columns } = req.body;

    const board = await boardsService.createBoard({ id, title, columns });
    res.status(201).send(Board.toResponse(board));
  } catch {
    res.status(400).send({error: 'Bad request'})
  }

});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);

  if(board){
    res.json(Board.toResponse(board));
  } else {
    res.status(404).send('Board not found')
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
  const { id } = req.params;
  await boardsService.deleteById(id);

    res.status(204).send('The board has been deleted');
  } catch(e) {
    res.status(404).send('Board not found');
  }
});


router.route('/:id').put(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, columns } = req.body;

    const board = await boardsService.updateById({ id, title, columns });

    res.status(200).send(Board.toResponse(board));
  } catch(e) {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
