import boardsRepo from './board.memory.repository';
import * as tasksRepo from '../tasks/task.memory.repository';

interface TypeBoard {
  id: string;
  title: string;
  columns: [];
}

const getAll = () => boardsRepo.getAll();
const getById = (id: string) => boardsRepo.getById(id);
const createBoard = ({ id, title, columns }: TypeBoard) => boardsRepo.createBoard({ id, title, columns });
const deleteById = (id: string) => {
  tasksRepo.deleteTasksByBoardId(id);
  boardsRepo.deleteById(id);
};
const updateById = ({ id, title, columns }: TypeBoard) => boardsRepo.updateById({ id, title, columns });

export { getAll, getById, createBoard, deleteById, updateById };
