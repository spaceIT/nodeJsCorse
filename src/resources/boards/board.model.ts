import { v4 } from 'uuid';



export interface TypeIcolumn {
  id: string,
  title: string,
  order: number,
}

export interface TypeBoard {
  id?: string | undefined,
  title?: string | undefined,
  columns?: TypeIcolumn[] | undefined,
}


class Board implements TypeBoard {
  id: string | undefined;

  title: string | undefined;

  columns: TypeIcolumn[] | undefined;

  constructor({
    id = v4(),
    title = 'BOARD',
    columns = [{
      id: v4(),
      title: 'string',
      order: 0,
    }]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: TypeBoard) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
