import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { STATUS } from '@/common/enums';
import { BaseEntity } from '@/common/base.entity';
import { User } from '@/modules/users/user.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVE })
  status: STATUS;
}
