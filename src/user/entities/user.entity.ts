import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { RoleEnum, SocialProvider } from 'user/user.enums';
import { Customer } from './customer.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @Column({ type: 'enum', enum: SocialProvider })
  socialProvider: SocialProvider;

  @Column({ type: 'varchar', default: '' })
  refreshToken: string;

  @Column({ default: false })
  isDelete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;
}
