/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/await-thenable */
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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/cart.dto';
import { Response, Request } from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('save')
  async create(@Body() Body: CreateCartDto, @Res() res: Response) {
    return await this.cartService.create(Body);
    // return res.status(result.statusCode).send(result);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
