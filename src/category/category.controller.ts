/* eslint-disable @typescript-eslint/require-await */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('new')
  async create(@Body() Body: CreateCategoryDto, @Res() res: Response) {
    const result: any = this.categoryService.create(Body);
    return res.status(result.statusCode).send(result);
  }

  @Get('find-all')
  findAll(@Res() res: Response) {
    const result: any = this.categoryService.findAll();
    return res.status(result.statusCode).send(result);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
