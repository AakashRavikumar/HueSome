/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessResponse, ErrorResponse } from 'src/common/constants/responses';
import {
  SuccessMessages,
  ErrorMessages,
} from 'src/common/constants/http-messages';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(Body: CreateCartDto) {
    try {
      // const cart = this.cartRepository.create(Body);
      console.log(Body);
      await this.cartRepository.save(Body);

      return new SuccessResponse(SuccessMessages.CART_DETAILS_SAVED, {}, 201);
    } catch (err: any) {
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_CREATE,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
