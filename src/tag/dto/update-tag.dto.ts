import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class UpdateTagDto {
  @IsString()
  @IsOptional()
  @Length(0, 40)
  name?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
