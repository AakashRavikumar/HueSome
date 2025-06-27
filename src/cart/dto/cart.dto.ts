/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNumber,
  IsEnum,
  IsOptional,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { CartStatus } from 'src/common/constants/roles.constants';

export class CreateCartDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  productIds: number[];

  @IsOptional()
  @IsEnum({ enum: [CartStatus.PENDING, CartStatus.ORDER_PLACED] })
  status: string;
}

// export class updateRoleDto {
//   @IsNumber()
//   id: number;

//   @IsIn([Role.ADMIN, Role.USER])
//   role: string;
// }

// export class findAllDto {
//   @IsString()
//   page: string;

//   @IsString()
//   limit: string;
// }
