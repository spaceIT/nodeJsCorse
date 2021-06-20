import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TypeIcolumn } from "../boards/board.model";
import { Task } from './task';

@Entity()
class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30 })
    title: string;

    @Column({ type: 'jsonb', nullable: true })
    columns: TypeIcolumn[];

    @OneToMany(() => Task, (task) => task.boardId)
    tasks: Task[];
}

export default Board