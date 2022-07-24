import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../common/base.model';

@Entity('user')
export class UserEntity extends BaseModel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { length: 100, name: 'first_name' })
  firstName: string;

  @Column('varchar', { length: 100, name: 'last_name' })
  lastName: string;

  @Column('varchar', { length: 100, name: 'user_name' })
  userName: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'phone', nullable: true })
  phone?: string;
}
