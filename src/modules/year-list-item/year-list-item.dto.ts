import { IsNotEmpty, IsString } from 'class-validator';

export class YearListItemCreateDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
