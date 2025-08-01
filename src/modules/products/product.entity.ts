import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { STATUS } from '@/common/enums';
import { BaseEntity } from '@/common/base.entity';
import { Category } from '@/modules/categories/category.entity';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVE })
  status: STATUS;
}
