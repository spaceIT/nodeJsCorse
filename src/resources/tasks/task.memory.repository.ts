import Task, { TypeTask } from './task.model';

const allTasks = [new Task()];

const getAll = async () => allTasks;
const getById = async (id: string) => allTasks.find(item => item.id === id);
const createTask = async (id: string, task: TypeTask) => {

  const newCopyTask = JSON.parse(JSON.stringify(task));
  newCopyTask.boardId = id;

  const newTask = new Task(newCopyTask);

  allTasks.push(newTask);

  return newTask;
};

const deleteById = async (id: string) => {
  const indexTasks = allTasks.findIndex(item => item.id === id);

  allTasks.splice(indexTasks, 1);

  return allTasks;
};

const updateById = async (id: string, boardId: string, task: TypeTask) => {
  const { title, order, description, userId, columnId } = task;

  const taskIdx = allTasks.findIndex(({ id: taskId }) => taskId === id);

  const newUpdatedTask = JSON.parse(JSON.stringify(allTasks[taskIdx]));

  newUpdatedTask.title = title;
  newUpdatedTask.order = order;
  newUpdatedTask.description = description;
  newUpdatedTask.userId = userId;
  newUpdatedTask.boardId = boardId;
  newUpdatedTask.columnId = columnId;

  allTasks.splice(taskIdx, 1, newUpdatedTask);

  return newUpdatedTask;
};

const removeUserById = async (id: string) => {
  const assignedTasks = allTasks.filter((task) => task.userId === id);

  await Promise.allSettled(assignedTasks.map(async (task) => updateById(task.id, task.boardId, { ...task, userId: null })));

  return 'Success';
};

const deleteTasksByBoardId = async (boardId: string) => {
  const boardTasks = allTasks.filter(task => task.boardId === boardId);

  await Promise.allSettled(boardTasks.map(async (task) => deleteById(task.id)));

  return 'Success';
};

export { allTasks, getAll, getById, createTask, deleteById, updateById, removeUserById, deleteTasksByBoardId };
