import * as tasksRepo from './task.memory.repository';

interface TypeTask {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: number
  }

const getAll = () => tasksRepo.getAll();
const getById = (id: string) => tasksRepo.getById(id);
const createTask = (id: string, task: TypeTask) => tasksRepo.createTask(id, task);
const deleteById = (id: string) => tasksRepo.deleteById(id);
const updateById = (id: string, boardId: string, task: TypeTask) => tasksRepo.updateById(id, boardId, task);

export { getAll, getById, createTask, deleteById, updateById };
