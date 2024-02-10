import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Connection } from './connection.entity'

@Entity({ name: 'connection_profile' })
export class ConnectionProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  displayName: string

  @Column()
  avatarUrl: string

  @OneToOne(() => Connection, connection => connection.profile)
  @JoinColumn()
  connection: Connection

  @UpdateDateColumn()
  updatedAt: Date
}
