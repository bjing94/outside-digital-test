import { IsArray, IsNumber } from 'class-validator';

export default class AddTagsDto {
  @IsNumber({}, { each: true })
  tags: number[];
}
