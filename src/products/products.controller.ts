/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  NotFoundException,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FindAllProductsDto } from './dto/product.dto';
import { createFileInterceptor } from 'src/common/interceptors/file-upload.interceptor';
import { Express, Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('new-product')
  @UseInterceptors(createFileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
    @Res() res: Response,
  ) {
    if (!file) throw new NotFoundException('File not found!');

    const result: any = await this.productsService.create(body, file);
    return res.status(result.statusCode).send(result);
  }

  @Get('find-all')
  async findAll(@Query() query: FindAllProductsDto, @Res() res: Response) {
    const result: any = await this.productsService.findAll(
      query?.category,
      query.limit,
      query.page,
    );
    return res.status(result.statusCode).send(result);
  }

  @Get('image/:imagename')
  getFile(@Param('imagename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found!');
    }
    // console.log(filePath);
    res.sendFile(filePath);
  }

  @Get('find-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @Delete('del/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result: any = await this.productsService.remove(+id);
    return res.status(result.statusCode).send(result);
  }
}
