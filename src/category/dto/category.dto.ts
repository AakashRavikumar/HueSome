/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNumber,
  IsEmail,
  IsString,
  Length,
  IsIn,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2, 25, { message: 'Name must be between 2 and 25 characters.' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name can only contain alphabets and spaces.',
  })
  name: string;
}
