import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { STATUS } from '@/common/enums';
import { BaseEntity } from '@/common/base.entity';
import { Order } from '@/modules/orders/order.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  method: string; // karta, click, naqd, etc.

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paid_at: Date;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVE })
  status: STATUS;
}
