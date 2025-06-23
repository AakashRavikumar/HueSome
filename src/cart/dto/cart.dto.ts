/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsEnum, IsOptional, ArrayNotEmpty } from 'class-validator';
import { CartStatus } from 'src/common/constants/roles.constants';

export class CreateCartDto {
  @IsNumber()
  user_id: number;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  cart_products: number[];

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
