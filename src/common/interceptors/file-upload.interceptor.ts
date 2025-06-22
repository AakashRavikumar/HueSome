/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { allowedExtensions } from '../constants/allowed.extensions';

export function createFileInterceptor(fieldName = 'file') {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: './uploads', // I stored the file locally but storing it in a cloud service like AWS BUCKET is preferrable
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    }),
    fileFilter: (req, file, cb) => {
      const fileExt = extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(fileExt)) {
        return cb(new BadRequestException('Unsupported file type!'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: parseInt(process.env.MAX_FILE_SIZE_IN_MB || '10') * 1024 * 1024,
    },
  });
}
