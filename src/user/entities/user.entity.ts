import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Customer } from './customer.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  password: string;

  @Column({ type: 'varchar', length: 2, default: 'cu' })
  role: string;

  @Column({ type: 'varchar', length: 8, default: 'email' })
  signInProvider: string;

  @Column({ type: 'varchar', default: '' })
  refreshToken: string;

  @Column({ default: false })
  isRemoved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;

  get idAndEmail(): string {
    return this.id.toString() + '_' + this.email;
  }
}
