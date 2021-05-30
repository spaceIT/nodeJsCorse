const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * @memberOf module:BoardsService
 * @return {Promise<IBoard[]>}
 */
const getAll = () => boardsRepo.getAll();

/**
 * @memberOf module:BoardsService
 * @param {string} id - ID of boars
 * @return {Promise<IBoard>}
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * @memberOf module:BoardsService
 * @param {IBoard} id - id Board information
 * * @param {IBoard} title - title Board information
 * * @param {IBoard} columns - columns Board information
 * @return {Promise<IBoard>} created board
 */
const createBoard = ({ id, title, columns }) => boardsRepo.createBoard({ id, title, columns });

/**
 * @memberOf module:BoardsService
 * @param {string} id - ID of board
 * @return {Promise<IBoard>} deleted board
 */
const deleteById = (id) => {
  tasksRepo.deleteTasksByBoardId(id);
  boardsRepo.deleteById(id);
};

/**
 * @memberOf module:BoardsService
 * @param {string} id - ID of board
 * @param {string} title - title of board
 * @param {string} columns - columns of board
 * @return {Promise<IBoard>} updated board
 */
const updateById = ({ id, title, columns }) => boardsRepo.updateById({ id, title, columns });

module.exports = { getAll, getById, createBoard, deleteById, updateById };
