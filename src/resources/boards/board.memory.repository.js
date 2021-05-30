const Board = require('./board.model');

const allBoards = [new Board()];

/**
 * @memberOf module:BoardsRepo
 * @returns {Promise<IBoard[]>}
 */
const getAll = async () => allBoards;

/**
 * @memberOf module:BoardsRepo
 * @param {string} id - ID of the board
 * @returns {Promise<IBoard>}
 */
const getById = async (id) => allBoards.find(board => board.id === id);

/**
 * @memberOf module:BoardsRepo
 * @param {IBoard} data - New board's data
 * @returns {Promise<IBoard>}
 */
const createBoard = async ({ id, title, columns }) => {
  const board = new Board({ id, title, columns })
  allBoards.push(board);
  return board;
}

/**
 * @memberOf module:BoardsRepo
 * @param {string} id - ID of the board to delete
 * @returns {Promise<IBoard>} deleted board
 */
const deleteById = async (id) => {
  const boardPosition = allBoards.findIndex(board => board.id === id);

  if (boardPosition === -1)
    throw new Error('User not found');
  else
    allBoards.splice(boardPosition, 1);
}

/**
 * @memberOf module:BoardsRepo
 * @param {string} id - ID of the board that needs to be updated
 * @param {Partial<IBoard>} data - Optional properties to update board
 * @returns {Promise<IBoard>} updated board
 */
const updateById = async ({ id, title, columns }) => {
  const boardPosition = allBoards.findIndex(board => board.id === id);

  if (boardPosition === -1) {
    throw new Error('Board not found');
  } else {
    const oldBoard = allBoards[boardPosition];
    const newBoard = { ...oldBoard, title, columns };

    allBoards.splice(boardPosition, 1, newBoard);

    return newBoard;
  }
}



module.exports = { allBoards, getAll, getById, createBoard, deleteById, updateById };
