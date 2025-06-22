/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { SuccessResponse, ErrorResponse } from 'src/common/constants/responses';
import {
  SuccessMessages,
  ErrorMessages,
} from 'src/common/constants/http-messages';
import { Product } from './entities/product.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(Body: any, file: any) {
    try {
      // Body.sizes = Body.sizes.split(',');
      Body.title = Body.title != undefined ? Body.title : file.originalname;
      Body.imageName = file.filename;
      Body.imageUrl = file.path;

      await this.productRepository.save(Body);

      return new SuccessResponse(SuccessMessages.SAVE_PRODUCT, {}, 201);
    } catch (err: any) {
      if (err?.code == 23505)
        return new ErrorResponse(
          ErrorMessages.DUPLICATE_TITLE,
          ErrorMessages.DUPLICATE_TITLE,
          409,
        );
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_UPLOAD,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  async findAll(category: string, limit: number, page: number) {
    try {
      let filter: any = { is_deleted: false };

      if (category != undefined) filter.category = category;

      const [data, total] = await this.productRepository.findAndCount({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'ASC' },
      });

      return new SuccessResponse(SuccessMessages.DATA_FETCHED, {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      });
    } catch (err: any) {
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_FETCH_DATA,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  async findById(id: number) {
    return await this.productRepository.findOne({
      where: { is_deleted: false, id: id },
    });
  }

  async remove(id: number) {
    try {
      const moveFile = await this.softDeleteFile(id); // moving deleted file to delete folder

      await this.productRepository.update(
        { id, is_deleted: false },
        {
          is_deleted: true,
          imageName: moveFile,
          imageUrl: `uploads\\deleted\\${moveFile}`,
        },
      );
      return new SuccessResponse(SuccessMessages.DOCUMENT_DELETED);
    } catch (err: any) {
      console.log(err);
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_DELETE_DOC,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  async softDeleteFile(id: number) {
    const existingDoc: any = await this.findById(id);
    const existingfileName: string = existingDoc.imageName;

    const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
    const originalPath = path.join(uploadsPath, existingfileName);
    // just creating del dir
    const deletedDir = path.join(uploadsPath, 'deleted');
    if (!fs.existsSync(deletedDir)) {
      fs.mkdirSync(deletedDir, { recursive: true });
    }
    const ext = path.extname(existingfileName);
    const base = path.basename(existingfileName, ext);
    const newFileName = `${base}-deleted-${id}${ext}`;
    const deletedPath = path.join(uploadsPath, 'deleted', newFileName);
    // Move file
    fs.renameSync(originalPath, deletedPath);

    return newFileName;
  }
}
