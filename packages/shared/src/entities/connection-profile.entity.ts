import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Connection } from './connection.entity'
import { Exclude } from 'class-transformer'

@Entity({ name: 'connection_profile' })
export class ConnectionProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  displayName: string

  @Column()
  @Exclude()
  avatarUrl: string

  @OneToOne(() => Connection, connection => connection.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  connection: Connection

  @UpdateDateColumn()
  updatedAt: Date
}
