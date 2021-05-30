import Board, { TypeBoard } from './board.model';



const allBoards = [new Board()];

const getAll = async () => allBoards;

const getById = async (id: string) => allBoards.find((board) => board.id === id);

const createBoard = async ({ id, title, columns }: TypeBoard) => {
  const board = new Board({ id, title, columns });

  allBoards.push(board);

  return board;
};

const deleteById = async (id: string) => {
  const boardPosition = allBoards.findIndex(board => board.id === id);

  if (boardPosition === -1) { throw new Error('User not found'); }
  else { allBoards.splice(boardPosition, 1); }
};

const updateById = async ({ id, title, columns }: TypeBoard) => {
  const boardPosition = allBoards.findIndex((board) => board.id === id);

  if (boardPosition === -1) {
    throw new Error('Board not found');
  } else {
    const oldBoard = allBoards[boardPosition];
    const newBoard = JSON.parse(JSON.stringify(oldBoard));

    newBoard.title = title;
    newBoard.columns = columns;

    allBoards.splice(boardPosition, 1, newBoard);

    return newBoard;
  }
};



export default { allBoards, getAll, getById, createBoard, deleteById, updateById };
