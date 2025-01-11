import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class YearListItemCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  description: string;
}
