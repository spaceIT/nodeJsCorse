import { v4 } from 'uuid';


export interface TypeTask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId?: string | null,
  boardId: string,
  columnId?: number,
}

class Task implements TypeTask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId?: string | null;

  boardId: string;

  columnId?: number;

  constructor({
    id = v4(),
    title = 'BOARD',
    order = 0,
    description = "description",
    boardId = 'null',
    userId = 'null',
    columnId = 0,
  } = {}) {
    this.id = id || v4();
    this.title = title || '';
    this.order = order || 0;
    this.description = description || '';
    this.userId = userId;
    this.boardId = boardId || '';
    this.columnId = columnId;
  }

  static toResponse(task: TypeTask) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
