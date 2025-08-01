import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FILE_STATUS } from '@/common/enums';
import { BaseEntity } from '@/common/base.entity';

@Entity('files')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  fileName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: FILE_STATUS,
    default: FILE_STATUS.DRAFT,
  })
  status: FILE_STATUS;
}
