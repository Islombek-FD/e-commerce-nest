import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async getAll() {
    return this.fileRepository.find();
  }

  async getById(id: string) {
    return this.fileRepository.findOneBy({ id });
  }

  async uploadFile(file: Express.Multer.File) {
    const fileEntity = this.fileRepository.create({
      originalName: file.originalname,
      fileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    });

    return this.fileRepository.save(fileEntity);
  }
}
