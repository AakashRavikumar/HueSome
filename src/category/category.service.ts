import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessResponse, ErrorResponse } from 'src/common/constants/responses';
import {
  SuccessMessages,
  ErrorMessages,
} from 'src/common/constants/http-messages';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(Body: CreateCategoryDto) {
    try {
      Body.name = Body.name.toLowerCase();
      await this.categoryRepository.save(Body);

      return new SuccessResponse(SuccessMessages.CATEGORY_CREATED, {}, 201);
    } catch (err: any) {
      if (err?.code == 23505)
        return new ErrorResponse(
          ErrorMessages.CATEOGORY_ALREADY_EXISTS,
          ErrorMessages.DUPLICATE_USER,
          409,
        );
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_CREATE_CATEGORY,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  async findAll() {
    try {
      const data = await this.categoryRepository.findAndCount({
        where: { is_deleted: false },
        select: ['id', 'name', 'createdAt'],
        order: { name: 'ASC' },
      });

      return new SuccessResponse(SuccessMessages.DATA_FETCHED, data);
    } catch (err) {
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_FETCH_DATA,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
