/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNumber,
  IsString,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @Length(2, 25, { message: 'title must be between 2 and 25 characters.' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'title can only contain alphabets and spaces.',
  })
  title: string;

  @IsString()
  @IsOptional()
  @Length(10, 200, {
    message: 'description must be between 2 and 25 characters.',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'description can only contain alphabets and spaces.',
  })
  description: string;

  @IsString()
  price: string;

  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  category: string;

  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').map((tag) => tag.trim())
      : value,
  )
  @IsString({ each: true })
  sizes: string[];

  @IsString()
  @IsOptional()
  aspectRatio: string;

  @IsOptional()
  @IsString()
  imageName: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').map((tag) => tag.trim())
      : value,
  )
  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  @IsOptional()
  artistId: number;
}

export class FindAllProductsDto {
  @IsOptional()
  category: string;

  @IsNumber()
  @Transform(({ value }) => +value)
  limit: number;

  @IsNumber()
  @Transform(({ value }) => +value)
  page: number;
}
