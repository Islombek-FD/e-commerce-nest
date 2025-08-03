import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FILE_STATUS } from '@/common/enums';
import { File } from './file.entity';

@Injectable()
export class FileCleanerService {
  private readonly logger = new Logger(FileCleanerService.name);

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Har kuni soat 00:00 da ishlaydi
  async handleFileCleanup() {
    this.logger.log('Fayllarni tozalash boshlandi');

    const draftFiles = await this.fileRepository.find({
      where: { status: FILE_STATUS.DRAFT },
    });

    for (const file of draftFiles) {
      const fullPath = path.resolve(file.path);

      try {
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }

        await this.fileRepository.remove(file);
        this.logger.log(`O‘chirildi: ${file.originalName}`);
      } catch (err) {
        this.logger.error(`O‘chirishda xatolik: ${file.originalName}`, err);
      }
    }

    this.logger.log('Fayl tozalash tugadi');
  }
}
