import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';

export class BaseModel extends BaseEntity {
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  readonly updatedAt!: Date;
}
