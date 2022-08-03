import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export default class CreateTagDto {
  @IsString()
  @Length(0, 40)
  name: string;

  @IsOptional()
  @IsNumber()
  sortOrder: number;
}
