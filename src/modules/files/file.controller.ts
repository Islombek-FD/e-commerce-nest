import * as fs from 'fs';
import * as path from 'path';
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { PERMISSION } from '@/common/enums';
import { JwtAuthGuard, PermissionsGuard } from '@/common/guards';
import { Permissions } from '@/common/decorators';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.VIEW_FILES)
  @Get()
  getAll() {
    return this.fileService.getAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.VIEW_FILE)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.fileService.getById(id);
  }

  //@ts-ignore
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.UPLOAD_FILE)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // Maksimal fayl hajmi: 5 MB
      },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

        const fileExt = path.extname(file.originalname).toLowerCase();
        const isMimeAllowed = allowedMimeTypes.includes(file.mimetype);
        const isExtAllowed = allowedExtensions.includes(fileExt);

        if (isMimeAllowed && isExtAllowed) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(`File type not supported: ${file.mimetype}`),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');

          const uploadPath = path.join('uploads', year.toString(), month, day);

          fs.mkdirSync(uploadPath, { recursive: true });

          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.DOWNLOAD_FILE)
  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const file = await this.fileService.getById(id);
    const filePath = path.resolve(file.path);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    return res.download(filePath, file.originalName);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PERMISSION.DELETE_FILE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
