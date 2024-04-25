import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, default: '' })
  firstname: string;

  @Column({ type: 'varchar', length: 16, default: '' })
  lastname: string;

  @Column({ type: 'varchar', length: 32, default: '' })
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.customer, {
    cascade: ['remove'],
  })
  @JoinColumn()
  user: User;
  @Column({ type: 'int', nullable: false })
  userId: number;
}
