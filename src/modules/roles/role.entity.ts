import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { STATUS, PERMISSION } from '@/common/enums';
import { BaseEntity } from '@/common/base.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'simple-array', nullable: true })
  permissions: PERMISSION[];

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVE })
  status: STATUS;
}
