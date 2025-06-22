/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { SuccessResponse, ErrorResponse } from 'src/common/constants/responses';
import {
  SuccessMessages,
  ErrorMessages,
} from 'src/common/constants/http-messages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(Body: CreateUserDto, role?: string) {
    try {
      Body.role = role != undefined ? role : Body.role;
      const user = this.userRepository.create(Body); // password hashing always in entity(schema) itself
      await this.userRepository.save(user);

      return new SuccessResponse(SuccessMessages.USER_REGISTERED, {}, 201);
    } catch (err: any) {
      if (err?.code == 23505)
        return new ErrorResponse(
          ErrorMessages.USER_ALREADY_EXISTS,
          ErrorMessages.DUPLICATE_USER,
          409,
        );
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_REGISTER,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  async findAll(page: number, limit: number) {
    try {
      const [users, total] = await this.userRepository.findAndCount({
        where: { is_deleted: false },
        select: ['id', 'name', 'email', 'role'],
        skip: (page - 1) * limit,
        take: limit,
        order: { name: 'ASC' },
      });

      return new SuccessResponse(SuccessMessages.DATA_FETCHED, {
        data: users,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      });
    } catch (err) {
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_FETCH_DATA,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  async findById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id, is_deleted: false },
        select: ['name', 'email', 'role'],
      });

      if (user) return new SuccessResponse(SuccessMessages.DATA_FETCHED, user);
      else
        return new ErrorResponse(
          ErrorMessages.NO_DATA_FOUND,
          ErrorMessages.NO_DATA_FOUND,
          404,
        );
    } catch (err) {
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_FETCH_DATA,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const info: any = await this.findById(id);
      const deleteUsr = await this.userRepository.update(id, {
        is_deleted: true,
        email: `deleted_${Date.now()}_${info.user.email}`, // to avaoid duplicate emails. moreover, we can also avoid it using createIndex
      });
      if (deleteUsr.affected)
        return new SuccessResponse(SuccessMessages.USER_DELETED);
      else
        return new ErrorResponse(
          ErrorMessages.NO_DATA_FOUND,
          ErrorMessages.NO_DATA_FOUND,
          404,
        );
    } catch (err) {
      return new ErrorResponse(
        ErrorMessages.FAILED_TO_DELETE_USER,
        ErrorMessages.SOMETHING_WENT_WRONG,
        500,
      );
    }
  }
}
