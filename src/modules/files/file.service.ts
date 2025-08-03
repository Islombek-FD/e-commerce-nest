import * as fs from 'fs';
import * as path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async getAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async findById(id: string): Promise<File | null> {
    return this.fileRepository.findOneBy({ id });
  }

  async getById(id: string): Promise<File> {
    const file = await this.findById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async uploadFile(file: Express.Multer.File) {
    const fileEntity = this.fileRepository.create({
      originalName: file.originalname,
      fileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path
    });

    return this.fileRepository.save(fileEntity);
  }

  async remove(id: string): Promise<File> {
    const file = await this.getById(id);
    const filePath = path.resolve(file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return this.fileRepository.remove(file);
  }
}
