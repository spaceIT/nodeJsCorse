const {v4: uuid} = require('uuid');

/**
 * @typedef IColumn
 * @property {string} id - ID of the column
 * @property {string} title - TITLE of the column
 * @property {number} order - ORDER of the column
 */

/**
 * @typedef IBoard
 * @property {string} id - ID of the board
 * @property {string} title - TITLE of the board
 * @property {Array<IColumn>} columns - Array of columns of the board
 */

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
