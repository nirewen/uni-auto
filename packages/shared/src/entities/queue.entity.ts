import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Connection } from './connection.entity'

export enum QueueStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ type: 'enum', enum: QueueStatus, default: QueueStatus.PENDING })
  status: QueueStatus

  @ManyToOne(() => Connection, connection => connection.queues, {
    onDelete: 'CASCADE',
  })
  connection: Connection

  @Column({ type: 'json' })
  data: unknown

  @Column()
  endpoint: string

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
