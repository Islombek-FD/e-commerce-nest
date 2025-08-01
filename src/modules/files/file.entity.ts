import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FILE_STATUS } from '@/common/enums';
import { BaseEntity } from '@/common/base.entity';

@Entity('files')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column({ name: 'size' })
  size: number;

  @Column({ name: 'path' })
  path: string;

  @Column({
    type: 'enum',
    enum: FILE_STATUS,
    default: FILE_STATUS.DRAFT,
  })
  status: FILE_STATUS;
}
