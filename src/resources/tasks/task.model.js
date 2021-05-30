const { v4: uuid } = require('uuid');

/**
 * @typedef ITask
 * @property {string} boardId - ID of the board
 * @property {string} columnId - ID of the column
 * @property {string} description - DESCRIPTION of the task
 * @property {string} id - ID of the task
 * @property {number} order - ORDER of the task
 * @property {string} title - TITLE of the task
 * @property {string} userId - ID of the user
 */
class Task {
  constructor({
    id = uuid(),
    title = 'BOARD',
    order = 0,
    description = "description",
    boardId = null,
    userId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
