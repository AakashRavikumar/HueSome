/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNumber,
  IsEmail,
  IsString,
  Length,
  IsIn,
  Matches,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';

import { Role } from 'src/common/constants/roles.constants';

export class CreateUserDto {
  @IsString()
  @Length(2, 25, { message: 'Name must be between 2 and 25 characters.' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name can only contain alphabets and spaces.',
  })
  name: string;

  @IsMobilePhone()
  mobile: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.',
  })
  password: string;

  @IsIn([Role.ADMIN, Role.USER])
  @IsOptional()
  role: string;
}

export class updateRoleDto {
  @IsNumber()
  id: number;

  @IsIn([Role.ADMIN, Role.USER])
  role: string;
}

export class findAllDto {
  @IsString()
  page: string;

  @IsString()
  limit: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ChangePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.',
  })
  newPassword: string;
}
