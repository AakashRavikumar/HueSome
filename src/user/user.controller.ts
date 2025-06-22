/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, findAllDto } from './dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register') // alteast one admin user should be present to create any user
  async create(@Body() Body: CreateUserDto, @Res() res: Response) {
    const result: any = await this.userService.create(Body);
    return res.status(result.statusCode).send(result);
  }

  @Get('all-users')
  async findAll(@Query() query: findAllDto, @Res() res: Response) {
    const result: any = await this.userService.findAll(
      +query.page,
      +query.limit,
    );
    return res.status(result.statusCode).send(result);
  }

  @Get('find-by-id/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result: any = await this.userService.findById(+id);
    return res.status(result.statusCode).send(result);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async softDeleteUser(@Param('id') id: string, @Res() res: Response) {
    const result: any = await this.userService.softDelete(+id);
    return res.status(result.statusCode).send(result);
  }
}
