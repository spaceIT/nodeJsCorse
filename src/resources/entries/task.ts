import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { User } from './user';
  import { Board } from './board';
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 30 })
    title: string;
  
    @Column()
    order: number;
  
    @Column({ type: 'varchar', length: 30 })
    description: string;
  
    @ManyToOne(() => User, (user) => user.tasks, {
      onDelete: 'SET NULL',
      nullable: true,
    })
    @JoinColumn({ name: 'userId' })
    user: string | null;
  
    @ManyToOne(() => Board, (board) => board.tasks, {
      onDelete: 'CASCADE',
      nullable: true,
    })
    @JoinColumn({ name: 'boardId' })
    board: string | null;
  
    @Column({ type: 'varchar', nullable: true })
    userId: string | null;
  
    @Column({ type: 'varchar', nullable: true })
    boardId: string | null;
  
    @Column({ type: 'varchar', nullable: true })
    columnId: string | null;
  }